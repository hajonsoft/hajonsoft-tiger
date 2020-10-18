import { login } from './actions';
import { useDispatch, useSelector } from 'react-redux';
// Using reducer from src\redux\reducer.ts
const useUserState = ({provider}: any): any => {
    const authProvider = provider || 'firebase';

    const dispatch = useDispatch();

    const fetchUser = (user: any) => {
        dispatch(login({...user, authProvider}))
    }

// TODO: standardize state member based on site name
    return {
        user: useSelector((state: any) => state.user.data),
        loading: useSelector((state: any) => state.user.loading),
        error: useSelector((state: any) => state.user.error),
        //TODO: Calculate isValid based on validity of the token. If the token is expired then the user is no longer valid. In the validation grab the public key and validate token signature as well.
        isValid: useSelector((state: any) => state.user.data?.idToken ),
        fetchUser
    }
}

export default useUserState;