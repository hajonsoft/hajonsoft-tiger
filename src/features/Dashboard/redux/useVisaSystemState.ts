import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { systemSlice } from '../../../redux/reducer';

// Using reducer and state from src\redux\reducer.ts  (^P)
// fire events to saga.js ^p
// use service in to saga.js ^p

const useVisaSystemState = (): any => {

    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.system.data)

    useEffect(() => {
        if (Object.keys(data).length === 0) {
            fetchData({ path: 'visaSystem' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = (fetchInfo: any) => {
        dispatch(systemSlice.actions.fetch(fetchInfo))
    }
    const createData = (createInfo: any) => {
        dispatch(systemSlice.actions.create(createInfo))
    }
    const updateData = (updateInfo: any) => {
        dispatch(systemSlice.actions.update(updateInfo))
    }
    const deleteData = (deleteInfo: any) => {
        dispatch(systemSlice.actions.delete(deleteInfo))
    }
    return {
        data: _.cloneDeep(data),
        loading: useSelector((state: any) => state.system.loading),
        error: useSelector((state: any) => state.system.error),
        fetchData,
        createData,
        updateData,
        deleteData
    }
}

export default useVisaSystemState;