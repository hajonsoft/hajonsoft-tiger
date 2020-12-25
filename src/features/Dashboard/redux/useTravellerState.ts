import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { travellerSlice } from '../../../redux/reducer';

// Using reducer and state from src\redux\reducer.ts  (^P)
const usePackageState = (): any => {

    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.traveller.data)

    useEffect(() => {
        if (Object.keys(data).length === 0) {
            fetchData({ path: 'customer' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = (fetchInfo: any) => {
        dispatch(travellerSlice.actions.fetch(fetchInfo))
    }
    const createData = (createInfo: any) => {
        dispatch(travellerSlice.actions.create(createInfo))
    }
    const updateData = (updateInfo: any) => {
        dispatch(travellerSlice.actions.update(updateInfo))
    }
    const deleteData = (deleteInfo: any) => {
        dispatch(travellerSlice.actions.delete(deleteInfo))
    }
    return {
        data: _.cloneDeep(data),
        loading: useSelector((state: any) => state.traveller.loading),
        error: useSelector((state: any) => state.traveller.error),
        fetchData,
        createData,
        updateData,
        deleteData
    }
}

export default usePackageState;