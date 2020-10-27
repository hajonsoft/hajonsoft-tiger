import { useDispatch, useSelector } from 'react-redux';
import { packagesSlice } from './../../../redux/reducer';
// Using reducer and state from src\redux\reducer.ts  (^P)
const usePackageState = (): any => {

    const dispatch = useDispatch();
    const { fetch } = packagesSlice.actions;


    const fetchData = (fetchInfo: any) => {
        dispatch(fetch({ ...fetchInfo }))
    }

    return {
        data: useSelector((state: any) => state.packages.data),
        loading: useSelector((state: any) => state.packages.loading),
        error: useSelector((state: any) => state.packages.error),
        fetchData
    }
}

export default usePackageState;