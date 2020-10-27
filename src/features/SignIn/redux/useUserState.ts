import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '../../../redux/reducer';
// Using reducer from src\redux\reducer.ts
const useUserState = (provider = 'firebase'): any => {
    const authProvider = provider ;

    const dispatch = useDispatch();

    const fetchData = (user: any) => {
        dispatch(userSlice.actions.fetch({...user, authProvider}))
    }

    return {
        data: useSelector((state: any) => state.user.data),
        loading: useSelector((state: any) => state.user.loading),
        error: useSelector((state: any) => state.user.error),
        //TODO: Calculate isValid based on validity of the token. If the token is expired then the user is no longer valid. In the validation grab the public key and validate token signature as well.
        isValid: useSelector((state: any) => state.user.data?.idToken ),
        fetchData
    }
}

export default useUserState;