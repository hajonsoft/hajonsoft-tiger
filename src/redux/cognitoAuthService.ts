import axios from 'axios';


export const authService = {
    login: async function signInService(user: any) {

        const result =  await axios.post(`${process.env.REACT_APP_IDENTITY_SERVICE}/v1/accounts:signInWithPassword?key=${user.webapiKey}`, { email: user.email, password: user.password, returnSecureToken: true });
        return result;
    },
    register: async function signUpService(user: any) {

        const result = await axios.post(`${process.env.REACT_APP_IDENTITY_SERVICE}/v1/accounts:signUp?key=${user.webapiKey}`, { ...user, returnSecureToken: true });
        return result;
    }

};

// const cognitoUser = new CognitoUser({
    //   Username: values.email,
    //   Pool: UserPool,
    // });

    // const authDetails = new AuthenticationDetails({
    //   Username: values.email,
    //   Password: values.password,
    // });

    // cognitoUser.authenticateUser(authDetails, {
    //   onSuccess: (data: any) => {
    //     console.log("success", data);
    //     setCognitoUser(data);
    //     history.push("/dashboard");
    //   },
    //   onFailure: (err: any) => {
    //     setState((prev) => ({ ...prev, isError: true, message: err.message }));
    //     setUser(values);
    //     setFailCounter(failCounter + 1);
    //   },
    //   newPasswordRequired: (data: any) => {
    //     console.log("New password Required", data);
    //     setState((prev) => ({
    //       ...prev,
    //       isError: true,
    //       message: "Please enter new password",
    //       isNewPassword: true,
    //     }));
    //     cognitoUser.changePassword(values.password, "(Paris1234!)", function(
    //       err,
    //       result
    //     ) {
    //       if (err) {
    //         alert(err.message || JSON.stringify(err));
    //         return;
    //       }
    //       console.log("call result: " + result);
    //     });
    //   },
    // });