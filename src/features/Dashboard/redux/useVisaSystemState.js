import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { systemSlice } from "../../../redux/reducer";

// Using reducer and state from src\redux\reducer.ts  (^P)
// fire events to saga.js ^p
// use service in to saga.js ^p

const useVisaSystemState = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.system.data);

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      fetchData({ path: "visaSystem" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (fetchInfo) => {
    dispatch(systemSlice.actions.fetch(fetchInfo));
  };
  const createData = (createInfo) => {
    dispatch(systemSlice.actions.create(createInfo));
  };
  const updateData = (updateInfo) => {
    dispatch(systemSlice.actions.update(updateInfo));
  };
  const deleteData = (deleteInfo) => {
    dispatch(systemSlice.actions.delete(deleteInfo));
  };
  return {
    data: _.cloneDeep(data),
    loading: useSelector((state) => state.system.loading),
    error: useSelector((state) => state.system.error),
    fetchData,
    createData,
    updateData,
    deleteData,
  };
};

export default useVisaSystemState;
