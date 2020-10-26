import { packages } from './actions';
import { useDispatch, useSelector } from 'react-redux';
// Using reducer and state from src\redux\reducer.ts  (^P)
const usePackageState = (): any => {

    const dispatch = useDispatch();

    const fetchData = (fetchInfo: any) => {
        dispatch(packages({ ...fetchInfo }))
    }

    return {
        data: useSelector((state: any) => state.packages.data),
        loading: useSelector((state: any) => state.packages.loading),
        error: useSelector((state: any) => state.packages.error),
        fetchData
    }
}

export default usePackageState;