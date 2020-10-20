import { packageCustomers } from './actions';
import { useDispatch, useSelector } from 'react-redux';
// Using reducer and state from src\redux\reducer.ts  (^P)
const useCustomerState = (): any => {

    const dispatch = useDispatch();

    const fetchPackageCustomers= (fetchInfo: any) => {
        dispatch(packageCustomers({ ...fetchInfo }))
    }

    // TODO: standardize state member based on site name
    return {
        packageCustomers: useSelector((state: any) => state.packageCustomers.data),
        loading: useSelector((state: any) => state.packageCustomers.loading),
        error: useSelector((state: any) => state.packageCustomers.error),
        fetchPackageCustomers
    }
}

export default useCustomerState;