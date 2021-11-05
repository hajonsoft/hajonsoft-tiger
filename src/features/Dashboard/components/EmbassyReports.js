import React, { useState, forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  AddBox,
  Check,
  DeleteOutline,
  ChevronRight,
  Edit,
  SaveAlt,
  FilterList,
  LastPage,
  FirstPage,
  ChevronLeft,
  Clear,
  Search,
  ArrowDownward,
  Remove,
  ViewColumn,
  Details,
  Favorite,
  FavoriteBorder,
  Print
} from "@material-ui/icons";

const tableIcons = {
  PrintIcon: forwardRef((props, ref) => <Print {...props} ref={ref} />),
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
  MoreDetails: forwardRef((props, ref) => <Details {...props} ref={ref} />),
  Favorite: forwardRef((props, ref) => <Favorite {...props} ref={ref} />),
  NoFavorite: forwardRef((props, ref) => (
    <FavoriteBorder {...props} ref={ref} />
  )),

};

const EmbassyReports = React.forwardRef((props, ref) => {
    const [data, setData] = useState(passengers);
    const [columns, setColumns] = useState([
      { title: "Name", field: "name" },
      { title: "Passport Number", field: "passportNumber" },
      { title: "Birth Date", field: "birthDate" },
    ]);
  
    const editColumns = () => {
      setColumns((prev) => {
        return prev.map((p) => {
          if (p.title === "Name") {
            return { title: "Editted Name", field: "name" };
          }
          return p;
        });
      });
    };
  
    console.log(passengers, "PASSENGERS!!");
  
    return (
      <>
        <button onClick={editColumns}>Add more columns</button>
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            icons={tableIcons}
            columns={columns}
            data={data}
            title="Embassy Reports"
            components={{
              Toolbar: (props) => {
                return (
                  <div>
                    <MTableToolbar {...props} />
                  </div>
                );
              },
            }}
            localization={{ header: { actions: "Filter" }, toolbar: {
                exportPDFName: "Print PDF"
            } }}
            options={{ columnsButton: true, filtering: true }}
            cellEditable={{
              cellStyle: {},
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  console.log("newValue: " + newValue);
                  console.log("oldValue: " + oldValue);
                  console.log("rowData: " + JSON.stringify(rowData));
                  console.log("columnDef: " + JSON.stringify(columnDef));
  
                  // TODO: Make it edditable
                  setTimeout(resolve, 4000);
                });
              },
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData([...data, newData]);
  
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
  
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
  
                    resolve();
                  }, 1000);
                }),
            }}
          />
        </div>
      </>
    );
})

export default EmbassyReports;
