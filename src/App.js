import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyPlants from "./pages/MyPlants";
import Schedule from "./pages/Schedule";
import useStyles from "./styles/Styles.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const classes = useStyles();
  const {
    root,
  } = classes;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000"
      }
    }
  })

  const [plants, setPlants] = useState([]);

  /*Receives updatedPlands from MyPlants and sets it in plants useState*/
  const updatePlants = (updatedPlants) => {
    setPlants(updatedPlants);
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className={root}>
          <Switch>
            <Route path="/my-plants">
              <MyPlants 
                plants={plants}
                updatePlants={updatePlants}
              />
            </Route>
            <Route path="/schedule">
              <Schedule plants={plants}/>
            </Route>
            <Route path="/">
              <Home plants={plants}/>
            </Route>
          </Switch>
        </div>

      </Router>
    </ThemeProvider>
  )
}

export default App;