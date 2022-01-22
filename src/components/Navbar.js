import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import useStyles from "../styles/Styles.js";

function Navbar() {
  const classes = useStyles();
  const {
    appBar,
    link,
  } = classes;

  return (
    <Box displayPrint="none">
      <AppBar position="static">
        <Toolbar className={appBar}>
          <div>
            <Link className={link} to="/">Home</Link>
            <Link className={link} to="/my-plants">My Plants</Link>
            <Link className={link} to="/schedule">Schedule</Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;