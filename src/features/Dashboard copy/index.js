/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { LocalAirport } from '@material-ui/icons';
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
import React, { forwardRef, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from '../../firebaseapp';
import HajonsoftHeader from "../Header/HajonsoftHeader";
import CoreForm from './components/CoreForm';
import PackageDetail from './components/packageDetail';
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

const Dashboard = () => {
  // const mobileMedia = useMediaQuery((theme: any) =>
  //   theme.breakpoints.down("sm")
  // );

  // const { data: user } = useUserState();
  const [user, loading] = useAuthState(firebase.auth());
  const { data: packages, error, fetchData: fetchPackages } = usePackageState()
  const [state, setstate] = useState({ mode: 'list', record: {} })
  const title = "Package";

  // useEffect(() => {
  //   if (Object.keys(packages).length === 0) {
  //     fetchPackages({ user, projectId: process.env.REACT_APP_PROJECT_ID, folder: 'customer' })
  //   }
  // }, [])


  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: 'snow'
        }}
      >
        <HajonsoftHeader />
        <div>
          {state.mode !== 'list' &&
            <CoreForm mode={state.mode} record={state.record} title={title} onClose={() => setstate(st => ({ ...st, mode: 'list' }))} />
          }
          {state.mode === 'list' &&

            <MaterialTable
              icons={tableIcons}
              title={<Typography variant="h6"> <LocalAirport color="secondary" style={{ margin: '5px 5px auto 5px' }} />  Packages</Typography>}
              columns={[{ title: "Name", field: "name" }]}
              data={Object.keys(packages).map(x => ({ name: x }))}
              detailPanel={rowData => <PackageDetail data={rowData} />}
              actions={[
                {
                  icon: tableIcons.Add,
                  tooltip: `Add ${title}`,
                  isFreeAction: true,
                  onClick: (event) => setstate(st => ({ ...st, mode: 'create' })),
                },
                {
                  icon: () => <tableIcons.Edit color="action" />,
                  tooltip: `Edit ${title}`,
                  onClick: (event, rowData) => setstate(st => ({ ...st, mode: 'update', record: rowData })),

                },
                {
                  icon: () => <tableIcons.Delete color="error" />,
                  tooltip: `Delete ${title}`,
                  onClick: (event, rowData) => setstate(st => ({ ...st, mode: 'delete', record: rowData })),

                }
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
          }

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
