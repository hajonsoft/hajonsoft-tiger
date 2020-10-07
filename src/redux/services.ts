import axios from 'axios';


export const authService = {
    login: async function signInService(user: any) {

        const fbuser = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${user.webapiKey}`, { email: user.email, password: user.password, returnSecureToken: true });
        return fbuser;
    },
    register: async function signUpService(user: any) {

        const fbuser = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${user.webapiKey}`, { ...user, returnSecureToken: true });
        return fbuser;
    }

};
