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
  IconButton,
  Tooltip,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import bookLogo from "../../assets/book.png";
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
    <div
      style={{
        width: "100%",
        height: 150,
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 150,
          background: "rgb(48, 63, 159,1)",
          boxShadow: "0 3px 5px 2px rgba(0,0,0, .3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap-reverse",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
            width: "15%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              paddingLeft: 20,
            }}
          >
            <img src={bookLogo} style={{ height: 55, width: 55 }} />
            <h3
              style={{
                fontFamily: "Roboto",
                fontWeight: "300",

                marginTop: 0,
                marginBottom: 0,
                fontSize: 16,
                color: "rgba(255, 140, 0, 1)",
              }}
            >
              My Books
            </h3>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
          }}
        >
          <Typography variant="body1" style={{ color: "#fff" }}>
            {"© 2021 My Books All Rights Reserved "}{" "}
            <Link
              target="_blank"
              href="https://www.privacypolicies.com/live/8ccca296-cb47-490a-aa96-f4109d7e0426"
              style={{ color: "#fff" }}
            >
              Privacy Policy
            </Link>
          </Typography>
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "10%",
          }}
        >
          <IconButton
            target="_blank"
            href={"https://github.com/mkd63/book-recommend"}
          >
            <Tooltip title="Github">
              <GitHubIcon style={{ color: "#fff" }} />
            </Tooltip>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({}));
