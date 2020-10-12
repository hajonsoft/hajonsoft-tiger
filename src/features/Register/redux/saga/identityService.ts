


const identityService = () => {
    return {
        verifyEmployee: async (last_name: string, dob: string, ssn6: string, fingerprint: string) => {
            // try {
            //     const result = await axios.post(`${process.env.REACT_APP_IDENTITY_SERVICE}/registration/validate`, { fingerprint, last_name, dob: parseInt(moment(dob).format('YYYYMMDD')), ssn6: parseInt(ssn6), timestamp:  moment().format() });
            //     console.log(result);
            //     if (result && result.data && result.data.status && result.data.status === "valid") {

            //         return result.data.employee_number;
            //     }

            // } catch (err) {
            //     DataDoglogger.logger.error('Error searching for employee', { last_name, dob, ssn6, fingerprint, err });
            // }
            return null;
        },
    }
}

export default identityService;
