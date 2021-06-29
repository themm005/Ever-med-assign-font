import "./topbar.css"
import { AuthContext } from "../../context/AuthContextProvider";
import React, {  useContext } from "react";
import localStorageService from '../../service/localStorageService'
import { Button } from "@material-ui/core";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { useHistory } from "react-router-dom";


export default function Topbar() {

  const { user } = useContext(AuthContext);
  const history = useHistory();


  const handleLogOut = e => {
    e.preventDefault();
    localStorageService.clearToken();
    window.location.reload();
  }
  // console.log(user.role)

  return (
    <div className="topbar">
      <a href="/home" style={{ left: "20px", position: "relative",cursor:"pointer",textDecoration:"none",color:"white" }}>Manage Cutomer</a>
      <div style={{ marginRight: "20px" }}>
        {user.role === "ADMIN" &&<Button
          onClick={() => history.push('/admin')}
          startIcon={<PermContactCalendarIcon />}
          style={{
            marginRight: "10px"
            , color: "white"
          }}>Admin</Button>}
        Hi khun {user.username} !
        <button
          onClick={handleLogOut}
          style={{
            marginLeft: "10px",
            backgroundColor: "lightcoral",
            border: "none",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
