import React, { Fragment, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Box,
  Hidden,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "@material-ui/core";
import bookSample from "../../assets/book-sample.png";
import { PATCH, POST, GET } from "../../actions/api";
import Rating from "@material-ui/lab/Rating";
import BookPicture from "../picture-upload/UserPicture";
import googleBooks from "../../assets/google_books.png";
import Carousel from "./Carousel/Carousel";
import "./Carousel/Carousel.css";
import StarIcon from "@material-ui/icons/Star";

export default function Footer(props) {
  return (
    <Grid
      container
      style={{
        width: "100%",
        height: 250,
        backgroundColor: "rgba(255, 140, 0, 0.64)",
      }}
    ></Grid>
  );
}

const useStyles = makeStyles((theme) => ({}));
