import { useDispatch, useSelector } from 'react-redux';
import { packageCustomersSlice } from './../../../redux/reducer';
// Using reducer and state from src\redux\reducer.ts  (^P)
const usePackageCustomerState = (): any => {

    const dispatch = useDispatch();

    const fetchData = (fetchInfo: any) => {
        dispatch(packageCustomersSlice.actions.fetch({ ...fetchInfo }))
    }
    return {
        data: useSelector((state: any) => state.packageCustomers.data),
        loading: useSelector((state: any) => state.packageCustomers.loading),
        error: useSelector((state: any) => state.packageCustomers.error),
        fetchData
    }
}

export default usePackageCustomerState;