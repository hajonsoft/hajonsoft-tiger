import { packages } from './actions';
import { useDispatch, useSelector } from 'react-redux';
// Using reducer and state from src\redux\reducer.ts  (^P)
const usePackageState = (): any => {

    const dispatch = useDispatch();

    const fetchPackages = (fetchInfo: any) => {
        dispatch(packages({ ...fetchInfo }))
    }

    // TODO: standardize state member based on site name
    return {
        packages: useSelector((state: any) => state.packages.data),
        loading: useSelector((state: any) => state.packages.loading),
        error: useSelector((state: any) => state.packages.error),
        fetchPackages
    }
}

export default usePackageState;