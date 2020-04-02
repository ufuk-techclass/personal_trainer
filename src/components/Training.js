import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Addtraining from "./Addtraining";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

export default function Training() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

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
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const columns = [
    { title: "activity", field: "activity" },
    { title: "date", field: "date" },
    { title: "duration", field: "duration" },
    { title: "customername", field: "customername" }
  ];

  const deleteTraining = link => {
    if (window.confirm("Are you sure???")) {
      fetch(link, { method: "DELETE" })
        .then(res => fetchData())
        .catch(err => console.log(err));
    }
  };

  const saveTraining = trainings => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trainings)
    })
      .then(res => fetchData())
      .catch(err => console.log(err));
  };

  const updateTraining = (trainings, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trainings)
    })
      .then(res => fetchData())
      .catch(err => console.log(err));
  };

  const fetchData = () => {
    fetch("http://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(data => setTrainings(data.content))
      .then(console.log("aaa: ", trainings));
  };

  return (
    <div>
      <Addtraining saveTraining={saveTraining} />
      <MaterialTable
        icons={tableIcons}
        data={trainings}
        columns={columns}
        actions={[
          {
            icon: DeleteOutline,
            tooltip: "Delete User",
            // onClick: (event, rowData) => console.log("aaa: ", rowData.links)
            onClick: (event, rowData) => deleteTraining(rowData.links[1].href)
          }
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = trainings;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  updateTraining(newData, newData.links[1].href);
                }
              }, 1000);
            })
        }}
      />
    </div>
  );
}
