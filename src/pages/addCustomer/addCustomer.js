import "./addCustomer.css";
import Topbar from '../../component/topbar/Topbar'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import axios from '../../config/axios';
import {AuthContext} from '../../context/AuthContextProvider'
import  { useContext } from "react";
import { Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';



export default function AddCustomer() {
  const [Gender, setGender] = useState('');
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState("");
  const [Adress, setAddress] = useState("");

  
  const { user } = useContext(AuthContext);

  

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    
    const body = {
      name,
      lastName,
      Gender,
      Adress,
      CreateByUserID: user.id,
    };
      await axios.post("/customer", body);
    console.log(body);
  }


  return (
    <div>
      <Topbar />
      <div className="form-addCustomer">
        <span style={{ fontSize: "30px", justifyContent: "flex-start" }}>
          Add New Customer
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
          <FormLabel value={Gender} component="legend">
            Gender
          </FormLabel>
          <RadioGroup onChange={(e) => setGender(e.target.value)}>
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
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
            style={{backgroundColor:"lightgreen"}}
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