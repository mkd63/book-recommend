import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Grid, Box, Hidden, Typography } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "@material-ui/core";

export default function Home(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  return (
    <div className={classes.root}>
      <p>home</p>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 115,
    flexGrow: 1,
  },
}));
