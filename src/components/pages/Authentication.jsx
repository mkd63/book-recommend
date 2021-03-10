import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Grid, Box, Hidden, Typography } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function Authentication(props) {
  const { session } = useContext(GlobalContext);
  return (
    <Fragment>
      <div>App</div>
    </Fragment>
  );
}
