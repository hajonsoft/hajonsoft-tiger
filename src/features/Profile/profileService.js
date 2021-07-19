import axios from 'axios';
import moment from 'moment';
import datadogLogger from '../common/logger';
const fetch = require('node-fetch');

const profileService = () => {
    return {
        getProfileByPhoneNumber: async (phone_number) => {
            const filter = { where: { phone_number: `${phone_number.replace('+', '')}` } };

            const result = await axios.get(`${process.env.REACT_APP_DATA_SERVICE}/api/vwemployees?filter=${encodeURIComponent(JSON.stringify(filter))}`);
            if (result && result.data && result.data.length > 0) {

                return result.data[0];
            }
        },
        getEmployeeById: async (id) => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_DATA_SERVICE}/api/vwemployees/${id}`);
                if (result && result.data) {

                    return result.data;
                }
            } catch (err) {
                datadogLogger.logger.error('employee id: ' + id, err.message);
            }
        },
        searchEmployee: async (lastName, birthDate, SSN6) => {
            try {
                const filter = { where: { last_name: { like: `${lastName}`, options: 'i' }, json_data: { neq: null } } };
                const result = await axios.get(`${process.env.REACT_APP_DATA_SERVICE}/api/employees?filter=${encodeURIComponent(JSON.stringify(filter))}`);
                let foundEmployee;

                if (result && result.data && result.data.length > 0) {
                    result.data.forEach((e) => {
                        const jsonData = e.json_data;
                        const empBirthDate = moment(jsonData.BirthDate, "YYYY-MM-DD");
                        const registrationBirthDate = moment(birthDate);
                        const isSameBirthDate = empBirthDate.startOf('day').isSame(registrationBirthDate.startOf('day'), 'day');
                        if (isSameBirthDate && jsonData.PartialSSN && jsonData.PartialSSN === SSN6.substring(SSN6.length - jsonData.PartialSSN.length)) {
                            foundEmployee = e;
                            return;
                        }
                    });
                }
                if (!foundEmployee) {
                    datadogLogger.logger.warn('Wrong employee verification', { lastName, birthDate, SSN6 });

                }
                return foundEmployee;
            } catch (err) {
                datadogLogger.logger.error('Error searching for employee', { lastName, birthDate, SSN6, err });
            }

        },
        getSMSOptStatus: async(employee_number) => {
            try {
                const endpoint = `${process.env.REACT_APP_SMS_SERVICE}/sms-opt-status/${employee_number}`;
                let result = await fetch(endpoint);
                let json = result.json();
                if(json) {
                    return json;
                }
                //const result = await axios.get(`${process.env.REACT_APP_SMS_SERVICE}/sms-opt-status/${employee_number}`);
               
                if (result && result.data) {

                    return result.data;
                }
            } catch (err) {
                datadogLogger.logger.error('Unable update profile information', {employee_number, err});
            }
        },
        updateSMSOptStatus: async (employee_number, patchBody) => {
            try {
                const result = await axios.put(`${process.env.REACT_APP_SMS_SERVICE}/sms-opt-status-wa/${employee_number}`, patchBody);
                if (result && result.data) {

                    return result.data;
                }
            } catch(err)  {
                datadogLogger.logger.error('Unable update profile information.', {employee_number, patchBody, err});
            }
        },
        updateEmployee: async (id, employee) => {
            try {
                let sms_opt_body = {
                    employee_number: employee.id,
                    phone_number: `+1${employee.phone_number}`,
                    opt_status: employee.is_opt
                }

                await axios.put(`${process.env.REACT_APP_SMS_SERVICE}/sms-opt-status-wa/${id}`, sms_opt_body);

                const result = await axios.patch(`${process.env.REACT_APP_DATA_SERVICE}/api/employees/${id}`, employee);

                if (result && result.data) {
                    return result.data;
                }
            } catch (err) {
                datadogLogger.logger.error('Unable to update employee data', { id, employee, err });
            }

        },
        updateEmployeeEmail: async (id, employee, email) => {
            employee.email = email;
            try {
                const result = await axios.patch(`${process.env.REACT_APP_DATA_SERVICE}/api/employees/${id}`, employee);
                return result;
            } catch {
                datadogLogger.logger.error('Unable to update employee data', { id, employee });
            }

        }
    }
}

export default profileService;
