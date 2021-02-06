/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
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
import GroupIcon from '@material-ui/icons/Group';
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from '@material-ui/lab/Alert';
import MaterialTable from "material-table";
import pluralize from 'pluralize';
import React, { forwardRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import useTravellerState from './redux/useTravellerState';
import HajonsoftHeader from "../Header/HajonsoftHeader";
import CRUDForm from './components/CRUDForm';
import PackageDetail from './components/packageDetail';

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

const Dashboard = () => {

  const { data: travellers, loading, error } = useTravellerState()
  const [state, setstate] = useState({ mode: 'list', record: {} })
  const history = useHistory()
  const title = "Group";

  const Title = () => {
    return (
      <Grid container spacing={2} alignItems="center"><Grid item><GroupIcon /></Grid><Grid item><Typography variant="h6">{pluralize(title)}</Typography></Grid></Grid>
    )
  }

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: '#e3f2fd'
        }}
      >
        <HajonsoftHeader />
        <div>
          {loading && <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}><Grid item><CircularProgress size={60} />{`Loading ${pluralize(title)} ...`}</Grid></Grid>}
          {!loading && state.mode !== 'list' &&
            <CRUDForm mode={state.mode} record={state.record} title={title} onClose={() => setstate(st => ({ ...st, mode: 'list' }))} />
          }
          {!loading && state.mode === 'list' &&

            <MaterialTable
              icons={tableIcons}
              title={<Title />}
              columns={[
                {
                  title: "Name",
                  field: "name",
                  render: rowData => <Button href="" color="primary" onClick={() => history.push(`${rowData.name}/customers`)} style={{ textTransform: 'none' }}> {rowData.name} </Button>
                },
                {
                  title: "Total",
                  field: 'total'
                }
              ]}
              data={travellers ? Object.keys(travellers).map(v => ({ name: v, total: travellers[v].length })) : []}
              detailPanel={rowData => <PackageDetail data={rowData} />}
              actions={[
                {
                  icon: tableIcons.Add,
                  tooltip: `Add ${title}`,
                  isFreeAction: true,
                  onClick: (event) => setstate(st => ({ ...st, mode: 'create' })),
                },
                {
                  icon: () => <tableIcons.MoreDetails color="success" />,
                  tooltip: `Apply for visa`,
                  onClick: (event, rowData) => setstate(st => ({ ...st, mode: 'delete', record: rowData })),
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
                pageSize: 20,
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: `No ${pluralize(title)} to display, click + button above to add a ${title}`,
                },
              }}
            />
          }

        </div>
      </div>
      <Snackbar open={!!error} autoHideDuration={6000} >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};


export default Dashboard;
