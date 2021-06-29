import Topbar from "../../component/topbar/Topbar";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import axios from "../../config/axios";
import { AuthContext } from "../../context/AuthContextProvider";
import { useContext } from "react";
import { Button, makeStyles } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CancelIcon from "@material-ui/icons/Cancel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";





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
}));


export default function SingleCustomer() {
  let params = useParams();
  let history = useState();

  const classes = useStyle();


  const { user } = useContext(AuthContext);

  history = useHistory();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Adress, setAddress] = useState("");
  const [Gender, setGender] = useState("");
  const [edits, setEdits] = useState([]);
  const [Status, setStatus] = useState('');


  const fetchEditHistory = async () => {
    const res = await axios.get("/edithistory/" + params.id);
    console.log(res.data.userEdit)
    setEdits(res.data.userEdit);
  }

  const fetchCustomer = async () => {
    const res = await axios.get("/customer/" + params.id);
    setName(res.data.customer.name);
    setLastName(res.data.customer.lastName);
    setAddress(res.data.customer.Adress);
    setGender(res.data.customer.Gender);
    setStatus(res.data.customer.Status);
  };
  
  
  useEffect(() => {
    fetchCustomer();
    fetchEditHistory();
  }, []);

  const handleVerifly = async (e) => {
    e.preventDefault();
    console.log(Status)
    await axios.patch("/customer/status/" + params.id, {
      Status:"VERIFLY"
    });    
    console.log("succes");
    setStatus("VERIFLY");
  };

  const handleReject = async (e) => {
    e.preventDefault()
    await axios.patch("/customer/status/" + params.id, {
      Status:"REJECT",
    });  
    console.log("succes reject")
    setStatus("REJECT");
  }
  console.log(Status)

  const handleChecking = async (e) => {
    e.preventDefault();
    await axios.patch("/customer/status/" + params.id, {
      Status:"CHECKING",
    });
    setStatus("CHECKING")
  };

  return (
    <div>
      <Topbar />

      <div className="form-addCustomer">
        <span style={{ fontSize: "30px", justifyContent: "flex-start" }}>
          Customer {name} {lastName}
        </span>
        <form className="Form">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter username"
            className="Input"
            value={name}
          ></input>
          <label>Lastname</label>
          <input
            type="text"
            placeholder="Enter username"
            className="Input"
            value={lastName}
          ></input>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup>
            <FormControlLabel
              value="Male"
              control={<Radio checked={Gender === "Male" ? true : false} />}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio checked={Gender === "Female" ? true : false} />}
              label="Female"
            />
          </RadioGroup>
          <label>Address</label>
          <textarea
            type="text"
            placeholder="Enter Address"
            className="Input"
            value={Adress}
          ></textarea>
          <Button
            onClick={handleChecking}
            disabled={Status === "SUBMIT" ? false : true}
            style={{ backgroundColor: "lightcyan", marginBottom: "20px" }}
            startIcon={<VerifiedUserIcon />}
          >
            Checking
          </Button>
          <Button
            onClick={handleVerifly}
            disabled={Status === "CHECKING" ? false : true}
            style={{ backgroundColor: "lightgreen", marginBottom: "20px" }}
            startIcon={<VerifiedUserIcon />}
          >
            Verifly
          </Button>
          <Button
            disabled={Status === "CHECKING" ? false : true}
            onClick={handleReject}
            style={{ backgroundColor: "lightcoral" }}
            startIcon={<CancelIcon />}
          >
            Reject
          </Button>
        </form>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.thead}>
              <TableCell>Id</TableCell>
              <TableCell>Edit by</TableCell>
              <TableCell>Date Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {edits.map((edit) => (
              <TableRow>
                <TableCell>{edit._id}</TableCell>
                <TableCell>{edit.userId.name}</TableCell>
                <TableCell>{edit.createAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
