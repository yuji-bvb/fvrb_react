import React from "react";
import Main from "./features/profile/Main";
import Navbar from "./features/profile/Navbar";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import "./app.module.css";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: cyan,
    secondary: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: ["Comic Neue", "M PLUS 1p", "Kosugi Maru"].join(","),
    color: "lightgray",
  },
});
theme.typography.h3 = {
  [theme.breakpoints.down("sm")]: {
    fontSize: 35,
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: 20,
  },
  fontSize: 50,
};

theme.typography.h6 = {
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: 17,
  },
  fontSize: 20,
};

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <div className="container">
        <Main />
      </div>
    </MuiThemeProvider>
  );
};

export default App;
