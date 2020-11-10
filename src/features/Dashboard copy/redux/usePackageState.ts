import { useDispatch, useSelector } from 'react-redux';
import { packagesSlice } from './../../../redux/reducer';
// Using reducer and state from src\redux\reducer.ts  (^P)
const usePackageState = (): any => {

    const dispatch = useDispatch();
    const { fetch } = packagesSlice.actions;


    const fetchData = (fetchInfo: any) => {
        dispatch(fetch({ ...fetchInfo }))
    }
    const createData = (createInfo: any) => {
        dispatch(packagesSlice.actions.create({ ...createInfo }))
    }
    const updateData = (updateInfo: any) => {
        dispatch(packagesSlice.actions.update({ ...updateInfo }))
    }
    const deleteData = (deleteInfo: any) => {
        dispatch(packagesSlice.actions.delete({ ...deleteInfo }))
    }
    return {
        data: useSelector((state: any) => state.packages.data),
        loading: useSelector((state: any) => state.packages.loading),
        error: useSelector((state: any) => state.packages.error),
        fetchData,
        createData,
        updateData,
        deleteData
    }
}

export default usePackageState;