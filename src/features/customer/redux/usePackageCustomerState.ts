import { packageCustomers } from './actions';
import { useDispatch, useSelector } from 'react-redux';
// Using reducer and state from src\redux\reducer.ts  (^P)
const usePackageCustomerState = (): any => {

    const dispatch = useDispatch();

    const fetchPackageCustomers= (fetchInfo: any) => {
        dispatch(packageCustomers({ ...fetchInfo }))
    }
    return {
        data: useSelector((state: any) => state.packageCustomers.data),
        loading: useSelector((state: any) => state.packageCustomers.loading),
        error: useSelector((state: any) => state.packageCustomers.error),
        fetchPackageCustomers
    }
}

export default usePackageCustomerState;