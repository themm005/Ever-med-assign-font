import Topbar from "../../component/topbar/Topbar";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import axios from "../../config/axios";
import {AuthContext} from '../../context/AuthContextProvider'
import  { useContext } from "react";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

export default function EditPage() {
  
  let params = useParams();
  let history = useState();

  const { user } = useContext(AuthContext);

  history = useHistory()
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Adress, setAddress] = useState("");
  const [Gender, setGender] = useState("");


  const fetchCustomer = async () => {
    const res = await axios.get("/customer/" + params.id);
    console.log(res)
    setName(res.data.customer.name)
    setLastName(res.data.customer.lastName)
    setAddress(res.data.customer.Adress);
    setGender(res.data.customer.Gender);
  };

  


  useEffect(() => {
  fetchCustomer();
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.patch("/customer/" + params.id, {
      name,
      lastName,
      Adress,
      Gender,

      customerId: params.id,
      userId: user.id,
    });
    history.push('/home')
  };

  return (
    <div>
      <Topbar />
      <div className="form-addCustomer">
        <span style={{ fontSize: "30px", justifyContent: "flex-start" }}>
          Edit Page
        </span>
        <form className="Form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter username"
            className="Input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Lastname</label>
          <input
            type="text"
            placeholder="Enter username"
            className="Input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup onChange={(e) => setGender(e.target.value)}>
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
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <Button
            style={{ backgroundColor: "lightgreen" }}
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
          >
            Summit
          </Button>
        </form>
      </div>
    </div>
  );
}
