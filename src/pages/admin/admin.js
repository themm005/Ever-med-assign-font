import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../config/axios";
import { Button, makeStyles } from "@material-ui/core";
import Topbar from "../../component/topbar/Topbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import PageviewIcon from "@material-ui/icons/Pageview";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";


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
  formSelect: {
    margin: theme.spacing(1),
    minWidth: 200,
    marginLeft: "30px", 
    
  }
 
}));

export default function Admin() {

  const [customers, setCustomer] = useState([]);
  const [status,setStatus] = useState('')

  const classes = useStyle();
  
  const history = useHistory();

  console.log(customers)

  const fetchCustomer = async () => {
    const res = await axios.get("/customer");
    setCustomer(res.data.customer);
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`/customer/${id}`);
    fetchCustomer();
  };

  const handleEdit = async (id) => {
    history.push(`edit/${id}`);
  };

  const handleCustomerPage = async (id) => { 

    history.push(`customer/${id}`);
  }
    
  const handleChange = (e) => {
    setStatus(e.target.value)
    console.log(status)
  }
  

  return (
    <div className="body">
      <Topbar />
      <FormControl className={classes.formSelect}>
        <InputLabel>Select Status</InputLabel>
        <Select value={status} onChange={handleChange}>
          <MenuItem value={""}>All</MenuItem>
          <MenuItem value={"SUBMIT"}>Submit</MenuItem>
          <MenuItem value={"CHECKING"}>Checking</MenuItem>
          <MenuItem value={"VERIFLY"}>Verifly</MenuItem>
          <MenuItem value={"REJECT"}>Reject</MenuItem>
        </Select>
      </FormControl>
      <div className="con-listCustomer">
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.thead}>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Summit By</TableCell>
              <TableCell>Create At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status.length
              ? customers
                  .filter((item) => item.Status.includes(status))
                  .map((customer) => (
                    <TableRow>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.Gender}</TableCell>
                      <TableCell>{customer.Status}</TableCell>
                      <TableCell>{customer.CreateByUserID.name}</TableCell>
                      <TableCell>
                        {customer.created_date.slice(0, 10)}
                      </TableCell>
                      <TableCell>
                        <Button
                          style={{ marginRight: "20px" }}
                          onClick={() => handleEdit(customer._id)}
                          endIcon={<EditIcon />}
                          color="primary"
                          variant="contained"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(customer._id)}
                          endIcon={<DeleteIcon />}
                          color="secondary"
                          variant="contained"
                        >
                          Delete
                        </Button>
                        <IconButton
                          onClick={() => handleCustomerPage(customer._id)}
                        >
                          <PageviewIcon fontSize="large" color="disabled" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              : customers.map((customer) => (
                  <TableRow>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.Gender}</TableCell>
                    <TableCell>{customer.Status}</TableCell>
                    <TableCell>{customer.CreateByUserID.name}</TableCell>
                    <TableCell>{customer.created_date.slice(0, 10)}</TableCell>
                    <TableCell>
                      <Button
                        style={{ marginRight: "20px" }}
                        onClick={() => handleEdit(customer._id)}
                        endIcon={<EditIcon />}
                        color="primary"
                        variant="contained"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(customer._id)}
                        endIcon={<DeleteIcon />}
                        color="secondary"
                        variant="contained"
                      >
                        Delete
                      </Button>
                      <IconButton
                        onClick={() => handleCustomerPage(customer._id)}
                      >
                        <PageviewIcon fontSize="large" color="disabled" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
