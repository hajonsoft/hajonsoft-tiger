import axios from 'axios';
import moment from 'moment';
import DataDoglogger from '../../../../features/common/logger';



const identityService = () => {
    return {
        verifyEmployee: async (last_name: string, dob: string, ssn6: string, fingerprint: string) => {
            try {
                const result = await axios.post(`${process.env.REACT_APP_IDENTITY_SERVICE}/registration/validate`, { fingerprint, last_name, dob: parseInt(moment(dob).format('YYYYMMDD')), ssn6: parseInt(ssn6), timestamp:  moment().format() });
                console.log(result);
                if (result && result.data && result.data.status && result.data.status === "valid") {

                    return result.data.employee_number;
                }

            } catch (err) {
                DataDoglogger.logger.error('Error searching for employee', { last_name, dob, ssn6, fingerprint, err });
            }
            return null;
        },
        queryRegistrationLockout: async(fingerprint:string): Promise<boolean> => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_IDENTITY_SERVICE}/registration/failure/query/${fingerprint}`);
                if(result && result.data && result.data ==='ok') {
                    return false; //not locked out
                }
                else {
                    return true; //locked out
                }
            } catch(err) {
                DataDoglogger.logger.error(`Error querying browser fingerprint ${fingerprint} from Identity Server:`, {fingerprint, err} );
            }
            return false;
        },
        registrationSuccess: async(fingerprint:string) => {
            try {
                const result = await axios.post(`${process.env.REACT_APP_IDENTITY_SERVICE}/registration/success/${fingerprint}`);
            } catch(err) {
                DataDoglogger.logger.error(`Error posting successful registration for browser fingerprint ${fingerprint} to Identity Server:`, {fingerprint, err} );
            }
        },
        loginFailureReport: async(username:string, fingerprint:string) => {
            try {
                const result = await axios.post(`${process.env.REACT_APP_IDENTITY_SERVICE}/login/failure/log`,{username, fingerprint, timestamp:  moment().format() });
            } catch(err) {
                DataDoglogger.logger.error(`Error posting login failure report for user ${username} to Identity Server:`, {username, err} );
            }
        },
        loginSuccessReport: async(username:string, fingerprint:string) => {
            try {
                const result = await axios.post(`${process.env.REACT_APP_IDENTITY_SERVICE}/login/success/${username}`);
            } catch(err) {
                DataDoglogger.logger.error(`Error posting login sucess report for user ${username} to Identity Server:`, {username, err} );
            }
        },
        queryLoginLockout: async(username:string, fingerprint:string): Promise<boolean> => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_IDENTITY_SERVICE}/login/failure/query/${username}`);
                if(result && result.data && result.data ==='ok') {
                    return false; //not locked out
                }
                else {
                    return true; //locked out
                }
            } catch(err) {
                DataDoglogger.logger.error(`Error querying user ${username} lockout from Identity Server:`, {username, err} );
            }
            return false;
        },
    }
}

export default identityService;
