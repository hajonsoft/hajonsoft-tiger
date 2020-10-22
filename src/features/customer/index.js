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
import HajonsoftHeader from "../Header/HajonsoftHeader";
import useUserState from "../SignIn/redux/useUserState";
import usePackageCustomerState from './redux/usePackageCustomerState';
import {useParams} from 'react-router-dom'
import { CircularProgress } from '@material-ui/core';
import  CustomerDetail  from './components/CustomerDetail';


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
// TODO: show order history component here - PHASE II

const Customers = ({ employee }) => {
  // const mobileMedia = useMediaQuery((theme: any) =>
  //   theme.breakpoints.down("sm")
  // );
  const { user } = useUserState({
    provider: process.env.REACT_APP_AUTHPROVIDER,
  });
  const title = "Customer";
  const { data: packageCustomers, error, loading, fetchPackageCustomers } = usePackageCustomerState()
  let { packageName } = useParams();
  useEffect(() => {
    if (!packageCustomers){

      fetchPackageCustomers({ user, projectId: process.env.REACT_APP_DEFAULT_PROJECTID, folder: `customer/${packageName}/` })
    }

  },[fetchPackageCustomers,packageCustomers, packageName, user])

  if (loading) {
    return <CircularProgress />
  }

  const flatten = (data)=> {
    if (!data) return;
    const keys = Object.keys(data);
    return keys.map(nat=> Object.keys(data[nat]).map(hajId=> ({...data[nat][hajId]})))[0]
  
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
          {/* //TODO : Breadcrum here would be amazing */}
          <MaterialTable
            icons={tableIcons}
            title={`${packageName} ${title}s`}
            columns={[{ title: "Name", field: "name" },
            { title: "Gender", field: "gender" },
            { title: "From", field: "nationality" },
            { title: "Pass No", field: "passportNumber" },
            { title: "Birth Date", field: "birthDate" },
            { title: "Email", field: "email" },
            {"CreateDt":"2020-05-12T23:47:04.880Z","birthDate":"1969-03-26T00:00:00.000Z","birthPlace":"COTE DIVOIRE","email":"","gender":"Male","idNumber":"19AA88765","idNumberExpireDate":"1900-01-01T00:00:00.000Z","idNumberIssueDate":"1900-01-01T00:00:00.000Z","mahramName":"","name":"ABDOULAYE BAKAYOKO","nameArabic":"ABDOULAYE BAKAYOKO","nationality":"Cote Divoire","onSoftId":2987010,"passExpireDt":"2025-02-06T00:00:00.000Z","passIssueDt":"2020-02-07T00:00:00.000Z","passPlaceOfIssue":"COTE DIVOIRE","passportNumber":"19AA88765","phone":"","preNationality":"Cote Divoire","profession":"","relationship":""},
          ]}
            // data={Object.keys(packages).map(x => ({ name: x }))}
            data={flatten(packageCustomers)}
            detailPanel={rowData => <CustomerDetail customer={rowData} />}
            actions={[
              {
                icon: tableIcons.Add,
                tooltip: `Add ${title}`,
                isFreeAction: true,
                // onClick: (event) => onAdd(),
              },
              {
                icon: () => <tableIcons.Edit color="action" />,
                tooltip: `Edit ${title}`,
                // onClick: (event, rowData) => {
                //   onUpdate(rowData);
                // }
              },
              {
                icon: () => <tableIcons.Delete color="error" />,
                tooltip: `Delete ${title}`,
                // onClick: (event, rowData) => {
                //   onDelete(rowData);
                // }
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              grouping: true,
              pageSize: 10,
              exportButton: true,
            }}
            localization={{
              body: {
                emptyDataSourceMessage: `No ${title} to display, click + button above to add a new one`,
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


export default Customers;
