import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Grid, Box, Hidden, Typography } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "@material-ui/core";
import Home from "./Home";
export default function Authentication(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const { from } = props.location.state || {
    from: { pathname: `/${session.username}` },
  };
  const preventDefault = (event) => event.preventDefault();

  const loggedIn = (username) => {
    props.history.push({
      pathname: `/${username}`,
    });
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h3 className={classes.logoText}>MyBooks</h3>
        <div className={classes.options}>
          <Link
            className={classes.optionText}
            href="#"
            onClick={preventDefault}
            color="inherit"
          >
            Home
          </Link>
          <Link
            className={classes.optionText}
            href="#"
            onClick={preventDefault}
            color="inherit"
          >
            Find MyBook
          </Link>

          <Link
            className={classes.optionText}
            href="#"
            onClick={preventDefault}
            color="inherit"
          >
            About
          </Link>

          <Link
            className={classes.optionText}
            href="/login"
            onClick={preventDefault}
            color="inherit"
          >
            Login
          </Link>
          <div
            style={{
              width: 0.5,
              height: 23,
              background: "rgba(0,0,0,0.54)",
              marginTop: 2,
              marginLeft: 6,
              marginRight: 6,
            }}
          />
          <Link
            className={classes.optionText}
            style={{ marginLeft: 0 }}
            href="/register"
            onClick={preventDefault}
            color="inherit"
          >
            Register
          </Link>
        </div>
      </div>
      <Route exact path="/" component={Home} />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 15,
    height: 70,
    position: "fixed",
    top: 0,
    boxShadow: "0 3px 5px 2px rgba(0,0,0, .3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoText: {
    fontSize: 16,
    lineHeight: 20,
    color: "#21ff00",
  },
  boxPrimary: {
    background: "#4B7BEC",
  },
  flex: {
    margin: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logo: {
    height: 55,
    width: 55,
    marginRight: 10,
  },
  name: {
    color: "#000",
  },
  options: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: 35,
  },
  optionText: {
    marginLeft: 18,
    fontSize: 14,
    lineHeight: 18,
    color: "#000",
    fontWeight: "500",
    "&:hover": {
      color: "#0066ff",
    },
  },
}));
