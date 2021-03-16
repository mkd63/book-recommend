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
import { PATCH } from "../../actions/api";
import Rating from "@material-ui/lab/Rating";
import BookPicture from "../picture-upload/UserPicture";
import Carousel from "./Carousel/Carousel";
import "./Carousel/Carousel.css";

export default function BookCard(props) {
  const [book] = useState(props.book);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRating = async (v) => {
    const response = await PATCH(`/books/books_rating_patch`, {
      id: book.id,
      rating: v,
      token: props.token,
    });
    const result = await response.json();
    console.log(result, response);
    if (response.status === 401) {
      handleClickOpen();
    }
  };

  return (
    <Paper
      elevation={3}
      variant="outlined"
      style={{ width: 275, marginRight: 35 }}
    >
      <Grid container spacing={2} style={{ padding: 10 }}>
        <Grid item xs={12}>
          <Typography variant="h6">{book.name}</Typography>
          {/*<img
              src={item.volumeInfo.imageLinks.thumbnail}
              style={{ width: "100%", height: 320 }}
            />*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="body1" style={{ fontSize: 10 }}>
              by&nbsp;
            </Typography>
            {book.author.length > 1
              ? book.author.map((item) => (
                  <Typography variant="body1" style={{ fontSize: 10 }}>
                    {item + ","}&nbsp;
                  </Typography>
                ))
              : book.author.map((item) => (
                  <Typography variant="body1" style={{ fontSize: 10 }}>
                    {item}
                  </Typography>
                ))}
          </div>
          <div style={{ width: "100%", height: 350 }}>
            <BookPicture picture={book.picture} crop={book.cropped_data} />
          </div>
          <Typography variant="body1"></Typography>
          <Typography variant="body1"></Typography>
        </Grid>
        <Grid item xs={12}>
          <Rating
            name="half-rating"
            value={book.rating}
            precision={0.5}
            onChange={(e, v) => handleRating(v)}
          />
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
          >
            <DialogTitle id="alert-dialog-title">
              {"Login to rate this book"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please login to rate this book: {book.name}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  props.history.push("/login");
                }}
                color="primary"
                autoFocus
              >
                Login
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Grid item xs={12}>
          <Button size="small">Learn More</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: "#fff",
  },
}));
