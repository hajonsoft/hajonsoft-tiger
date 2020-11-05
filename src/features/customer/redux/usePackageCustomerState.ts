import { useDispatch, useSelector } from 'react-redux';
import { packageCustomersSlice } from './../../../redux/reducer';
// Using reducer and state from src\redux\reducer.ts  (^P)
const usePackageCustomerState = (): any => {

    const dispatch = useDispatch();

    const fetchData = (fetchInfo: any) => {
        dispatch(packageCustomersSlice.actions.fetch({ ...fetchInfo }))
    }
    const createData = (createInfo: any) => {
        dispatch(packageCustomersSlice.actions.create({ ...createInfo }))
    }
    const updateData = (updateInfo: any) => {
        dispatch(packageCustomersSlice.actions.update({ ...updateInfo }))
    }
    const deleteData = (deleteInfo: any) => {
        dispatch(packageCustomersSlice.actions.delete({ ...deleteInfo }))
    }
    return {
        data: useSelector((state: any) => state.packageCustomers.data),
        loading: useSelector((state: any) => state.packageCustomers.loading),
        error: useSelector((state: any) => state.packageCustomers.error),
        fetchData,
        createData,
        updateData,
        deleteData
    }
}

export default usePackageCustomerState;