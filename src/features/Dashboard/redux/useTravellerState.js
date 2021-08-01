import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { travellerSlice } from '../../../redux/reducer';

// Using reducer and state from src\redux\reducer.js  (^P)
const usePackageState = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state?.traveller?.data)

    useEffect(() => {
        if (Object.keys(data).length === 0) {
            fetchData({ path: 'customer' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = (fetchInfo) => {
        dispatch(travellerSlice.actions.fetch(fetchInfo))
    }
    const createData = (createInfo) => {
        dispatch(travellerSlice.actions.create(createInfo))
    }
    const updateData = (updateInfo) => {
        dispatch(travellerSlice.actions.update(updateInfo))
    }
    const deleteData = (deleteInfo) => {
        dispatch(travellerSlice.actions.delete(deleteInfo))
    }
    return {
        data: _.cloneDeep(data),
        loading: useSelector((state) => state.traveller.loading),
        error: useSelector((state) => state.traveller.error),
        fetchData,
        createData,
        updateData,
        deleteData
    }
}

export default usePackageState;