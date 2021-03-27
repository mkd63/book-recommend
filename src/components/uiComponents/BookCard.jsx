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

export default function BookCard(props) {
  const [book, setBook] = useState(props.book);
  const [open, setOpen] = useState(false);
  const [openRated, setOpenRated] = useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenRated = () => {
    setOpenRated(true);
  };
  const [userRating, setUserRating] = useState(null);
  const [bookRated, setBookRated] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseRated = () => {
    setOpenRated(false);
  };

  useEffect(() => {
    console.log("new book pls work", props.book);
    setBook(props.book);
  }, [props.book]);

  const handlePatchBookRating = async (v) => {
    const response = await PATCH(`/books/books_rating_patch`, {
      id: book.id,
      rating: v,
      token: props.token,
    });
    const result = await response.json();
    console.log(result);
    if (response.status === 401) {
      handleClickOpen();
    }
  };

  useEffect(() => {
    handleCheckBookRated();
  }, []);

  const handleCheckBookRated = async () => {
    if (props.userId) {
      //?user_id=${props.userId}&book_id=${book.id}
      const response = await POST(
        `/ratings/user_book_rated`,
        {
          user_id: props.userId,
          book_id: book.id,
        },
        props.token
      );
      const result = await response.json();
      if (response.status === 200) {
        setUserRating(result[0].fields.rating);
      }
    }
  };

  const handlePostRating = async (v) => {
    console.log("alag", props.userId);
    const responsePost = await POST(
      `/ratings`,
      {
        user: props.userId,
        book: book.id,
        rating: v,
      },
      props.token
    );
    const resultPost = await responsePost.json();
  };
  const handleRating = async (v) => {
    console.log("book_id", props.book.id);
    const response = await POST(
      `/ratings/user_book_rated`,
      {
        user_id: props.userId,
        book_id: book.id,
      },
      props.token
    );

    if (response.status === 400) {
      handlePostRating(v);
      handlePatchBookRating(v);
    } else if (response.status === 200) {
      handleClickOpenRated();
    }
  };
  return (
    <Paper
      key={props.key}
      elevation={3}
      variant="outlined"
      style={{ width: 275, marginRight: 35, marginTop: 35 }}
    >
      <Grid
        container
        spacing={2}
        style={{ padding: 10 }}
        direction="column-reverse"
      >
        <Grid item xs={7}>
          <Button
            style={{
              display: "flex",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "#f0f0f0",
              textTransform: "none",
              padding: "1px 12px",
            }}
            target="_blank"
            href={book.google_link}
          >
            <Typography variant="body2" style={{ fontSize: 10 }}>
              Try it on
            </Typography>
            <div>
              <img
                style={{ width: 60, marginTop: 8, marginLeft: 5 }}
                src={googleBooks}
              />
            </div>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Rating
            name={`rating-${book.id}`}
            value={book.rating}
            precision={0.5}
            onChange={(e, v) => handleRating(v)}
          />

          <Paper elevation={0} style={{ height: 20 }}>
            {userRating && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" style={{ fontSize: 10 }}>
                  You have rated this book with {userRating}
                </Typography>
                <StarIcon
                  style={{ fontSize: 13, marginBottom: 1, color: "#ffc400" }}
                  fontSize="small"
                />
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} zeroMinWidth>
          <Typography variant="h6" noWrap>
            {book.name}
          </Typography>
          {/*<img
              src={item.volumeInfo.imageLinks.thumbnail}
              style={{ width: "100%", height: 320 }}
            />*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: 4,
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

        <Dialog
          open={openRated}
          onClose={handleCloseRated}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You have already rated this bookcard
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRated} color="primary" autoFocus>
                Okay
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: "#fff",
  },
}));
