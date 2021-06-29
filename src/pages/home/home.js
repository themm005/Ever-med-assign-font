import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from '../../config/axios'
import { makeStyles } from '@material-ui/core'
import Topbar from '../../component/topbar/Topbar'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow"; 
import AddIcon from '@material-ui/icons/Add';
import EditIcon from "@material-ui/icons/Edit";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DeleteIcon from "@material-ui/icons/Delete";
import EditPage from '../editPage/editPage'
import "./home.css";

import { Button } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  table: {
    width: "70%",
    marginTop: "20px ",
  },
  thead: {
    "& > *": {
      background: "#DBE6FD",
      fontWeight: "bold",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Home() {


    const [customers, setCustomer] = useState([])
    const classes = useStyle()

    const history = useHistory();


    const fetchCustomer = async () => {
    const res = await axios.get('/customer');
    setCustomer(res.data.customer)
  };
  useEffect(() => {
    fetchCustomer();
  }, []);
  console.log(customers);

  const handleAddCustomer = (e) => {
    e.preventDefault()
    history.push("/add-new-customer");
  }

  
  const handleDelete = async(id) => {
    console.log(id)
    await axios.delete(`/customer/${id}`)
    fetchCustomer();
  };

  const handleEdit = async(id) => {
    // e.preventDefault();
    // // console.log(id)
     history.push(`edit/${id}`);
  }

  return (
    <div className="body">
      <Topbar />
      <div className="btn">
        <Button
          onClick={handleAddCustomer}
          startIcon={<PermIdentityIcon />}
          endIcon={<AddIcon />}
          color="primary"
          variant="contained"
        >
          Add New
        </Button>
      </div>
      <div className="con-listCustomer">
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.thead}>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell>Create By</TableCell> */}
              <TableCell>Create At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.Gender}</TableCell>
                <TableCell>{customer.Status}</TableCell>
                {/* <TableCell>{customer.CreateByUserID.name}</TableCell> */}
                <TableCell>{customer.created_date.slice(0, 10)}</TableCell>
                <TableCell>
                  <Button
                    style={{ marginRight: "20px" }}
                    onClick={()=>handleEdit(customer._id)}
                    endIcon={<EditIcon />}
                    color="primary"
                    variant="contained"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={()=>handleDelete(customer._id)}
                    endIcon={<DeleteIcon />}
                    color="secondary"
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
    </div>
  );
}

