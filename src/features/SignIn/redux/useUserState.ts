import { loginSuccess } from './actions';
import { useDispatch, useSelector } from 'react-redux';

const useUserState = (): any => {
    const dispatch = useDispatch();

    const setCognitoUser = (user: any) => {
        dispatch(loginSuccess(user))
    }


    return {
        cognitoUser: useSelector((state: any) => state.cognitoUser),
        isAuthenticated: useSelector((state: any) => state.cognitoUser ? true : false),
        setCognitoUser
    }
}

export default useUserState;