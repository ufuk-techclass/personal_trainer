import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Addcustomer from "./Addcustomer";
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
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

export default function Customers() {
  const [customers, setcustomers] = useState([]);

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
    { title: "firstname", field: "firstname" },
    { title: "lastname", field: "lastname" },
    { title: "streetaddress", field: "streetaddress" },
    { title: "postcode", field: "postcode" },
    { title: "city", field: "city" },
    { title: "email", field: "email" },
    { title: "phone", field: "phone" }
  ];

  const deleteCustomer = link => {
    if (window.confirm("Are you sure???")) {
      fetch(link, { method: "DELETE" })
        .then(res => fetchData())
        .catch(err => console.log(err));
    }
  };

  const saveCustomer = customers => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customers)
    })
      .then(res => fetchData())
      .catch(err => console.log(err));
  };

  const saveTraining = customers => {
    console.log("BBBBBBBBBBBb");
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    })
      .then(res => fetchData())
      .catch(err => console.log(err));
  };

  const fetchData = () => {
    fetch("http://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(data => setcustomers(data.content))
      .then(console.log("aaa: ", customers));
  };

  return (
    <div>
      <Addcustomer saveCustomer={saveCustomer} />
      <MaterialTable
        icons={tableIcons}
        data={customers}
        columns={columns}
        actions={[
          {
            icon: DeleteOutline,
            tooltip: "Delete User",
            // onClick: (event, rowData) => console.log("aaa: ", rowData.links)
            onClick: (event, rowData) => deleteCustomer(rowData.links[1].href)
          },
          {
            icon: DirectionsRunIcon,
            tooltip: "Add Training",
            onClick: (event, rowData) => saveCustomer()
            // onClick: (event, rowData) => console.log("aaa: ", rowData.links)
          }
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = customers;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  updateCustomer(newData, newData.links[1].href);
                }
              }, 1000);
            })
        }}
      />
    </div>
  );
}
