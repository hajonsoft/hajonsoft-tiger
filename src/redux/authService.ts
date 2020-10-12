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
