import React from 'react'
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DetailsIcon from '@material-ui/icons/Details';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import _ from 'lodash';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  MoreDetails: forwardRef((props, ref) => <DetailsIcon {...props} ref={ref} />),

};

const useStyles = makeStyles((theme) => ({
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },
  importButton: {
    alignSelf: 'stretch',
    textTransform: 'none',
  },
  importUrlField: {
    width: '30%',
  },
  importChip: {
    width: '30%',
    backgroundColor: 'Teal',
    boxShadow: '2px 2px silver',
    padding: '10px',
    color: 'white',
    borderRadius: '16px',
    fontSize: '0.8em',
    textAlign: 'center'
  }
}));

const CoreList = ({ model, records, onAdd, onDelete, onUpdate, onImport, importMessage, onImportUrlChange, onModelChange }) => {
  const summaryColumns = _.filter(model.fields, (f)=> !!f.summary);
  const sortedSummaryColumns = _.orderBy(summaryColumns, ['summary', ['asc']]).map(r => { return { title: r.label, field: r.name } });
  const classes = useStyles();

  return (
    <React.Fragment>
      {(importMessage) &&
        <div className={classes.toolbarContainer}>
          <TextField className={classes.importUrlField} onChange={onImportUrlChange} label="Import url"></TextField>
          <div className={classes.importChip} > {importMessage} </div>
          <Button onClick={onImport} color='secondary' className={classes.importButton}>Import</Button>
        </div>
      }
      <MaterialTable icons={tableIcons}
        title={model.pluralName}
        columns={sortedSummaryColumns}
        data={records}
        actions={[
          {
            icon: tableIcons.Add,
            tooltip: 'Add ' + model.name,
            isFreeAction: true,
            onClick: (event) => onAdd()
          },
          {
            icon: tableIcons.MoreDetails,
            tooltip: 'Details ' + model.name,
            onClick: (event, rowData) => {
              onModelChange(rowData);
            }
          },
          {
            icon: tableIcons.Edit,
            tooltip: 'Edit ' + model.name,
            onClick: (event, rowData) => {
              onUpdate(rowData);
            }
          },
          {
            icon: tableIcons.Delete,
            tooltip: 'Delete ' + model.name,
            iconProps: {
              style: 'color: "red"',
            },
            onClick: (event, rowData) => {
              onDelete(rowData);
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          grouping: false,
          exportButton: true,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: `No ${model.name}s to display, import or add ${model.name}s by clicking the plus sign above.`,
          },
        }}
      />
    </React.Fragment>
  );
}

export default CoreList;