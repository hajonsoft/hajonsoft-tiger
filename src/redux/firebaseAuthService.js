import axios from 'axios';


export const authService = {
    login: async (user) => {
        const result =  await axios.post(`${process.env.REACT_APP_IDENTITY_SERVICE}/v1/accounts:signInWithPassword?key=${user.webapiKey}`, { email: user.email, password: user.password, returnSecureToken: true });
        return result;
    },
    register: async (user) => {
        const result = await axios.post(`${process.env.REACT_APP_IDENTITY_SERVICE}/v1/accounts:signUp?key=${user.webapiKey}`, { ...user, returnSecureToken: true });
        return result;
    }

};
