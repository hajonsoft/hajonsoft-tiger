import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DetailsIcon from "@material-ui/icons/Details";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from '@material-ui/lab/Alert';
import MaterialTable from "material-table";
import React, { forwardRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import HajonsoftHeader from "../Header/HajonsoftHeader";
import useUserState from "../SignIn/redux/useUserState";
import usePackageState from './redux/usePackageState';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  MoreDetails: forwardRef((props, ref) => <DetailsIcon {...props} ref={ref} />),
};
// TODO: show order history component here

const Dashboard = ({ employee }) => {
  // const mobileMedia = useMediaQuery((theme: any) =>
  //   theme.breakpoints.down("sm")
  // );

  const history = useHistory();
  const { user } = useUserState({
    provider: process.env.REACT_APP_AUTHPROVIDER,
  });
  const { packages, error, fetchPackages } = usePackageState()

  useEffect(() => {
    if ((!packages || Object.keys(packages).length === 0) && !error){
      fetchPackages({ user, projectId: process.env.REACT_APP_DEFAULT_PROJECTID, folder: 'customer' })
    }
  },[fetchPackages, packages, user, error])

  const onGotoCustomers = (packageName) => {
    history.push(`package/${packageName}/customers`)
  }
  return (
    <React.Fragment>
      <div
        style={{
          background:
            "transparent linear-gradient(180deg, #005F90 0%, #0089C7 100%) 0% 0% no-repeat padding-box",
          opacity: 1,
        }}
      >
        <HajonsoftHeader />
        <div>
          <MaterialTable
            icons={tableIcons}
            title={`Packages`}
            columns={[{ title: "Name", field: "name" }]}
            data={Object.keys(packages).map(x => ({ name: x }))}
            detailPanel={rowData => {
              return (<Button color="primary" variant="outlined" onClick={() => onGotoCustomers(rowData.name)}>View customers for {rowData.name}</Button>)
            }}
            actions={[
              {
                icon: tableIcons.Add,
                tooltip: "Add package",
                isFreeAction: true,
                // onClick: (event) => onAdd(),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              grouping: false,
              exportButton: true,
            }}
            localization={{
              body: {
                emptyDataSourceMessage: `No packages to display, click + button above to add a package`,
              },
            }}
          />
        </div>
      </div>
      <Snackbar open={error} autoHideDuration={6000} >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Dashboard;
