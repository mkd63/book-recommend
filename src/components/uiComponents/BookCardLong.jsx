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
import googleBooks from "../../assets/google_books.png";
import bookSample from "../../assets/book-sample.png";
import { PATCH, POST } from "../../actions/api";
import Rating from "@material-ui/lab/Rating";
import BookPicture from "../picture-upload/UserPicture";
import Carousel from "./Carousel/Carousel";
import "./Carousel/Carousel.css";
import StarIcon from "@material-ui/icons/Star";

import swal from "@sweetalert/with-react";
export default function BookCardLong(props) {
  const [book] = useState(props.book);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [openRated, setOpenRated] = useState(false);

  const [userRating, setUserRating] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenRated = () => {
    setOpenRated(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseRated = () => {
    setOpenRated(false);
  };

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

  useEffect(() => {
    handleCheckBookRated();
  }, []);
  const onBookRatedSuccess = () => {
    swal("Great!", `You rated the book successfully`, "success", {
      button: "Okay",
    });
  };
  const handlePatchBookRating = async (v) => {
    const response = await PATCH(`/books/books_rating_patch`, {
      id: book.id,
      rating: v,
      token: props.token,
    });
    const result = await response.json();
    console.log(result);
    // if (response.status === 401) {
    //   handleClickOpen();
    //
    // }
    return response;
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
    if (responsePost.status === 201) {
      onBookRatedSuccess();
    }
    return responsePost;
  };
  const handleRatingLong = async (v) => {
    console.log("POST");
    const response = await POST(
      `/ratings/user_book_rated`,
      {
        user_id: props.userId,
        book_id: book.id,
      },
      props.token
    );

    console.log("haha", response.status);
    if (response.status === 400) {
      console.log("in if 400");
      const postRating = handlePostRating(v);
      const patchBookRating = handlePatchBookRating(v);
      if (postRating.status == 201 && patchBookRating.status == 200) {
        props.loadBooksByRating();
      } else if (patchBookRating.status == 401) {
        handleClickOpen();
      }
    } else if (response.status === 200) {
      handleClickOpenRated();
    }
  };
  return (
    <Paper
      elevation={5}
      variant="outlined"
      style={{ width: "99.85%", marginRight: 35 }}
    >
      <Grid container spacing={2} style={{ padding: 30, paddingBottom: 20 }}>
        <Grid item xs={3}>
          <div style={{ width: "100%", height: 370 }}>
            <BookPicture picture={book.picture} crop={book.cropped_data} />
          </div>
        </Grid>
        <Grid container item xs={5}>
          <Grid item xs={12}>
            <Typography variant="h4">{book.name}</Typography>
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
          </Grid>
          <Grid item xs={5}>
            <Rating
              name="rating"
              value={book.rating}
              precision={0.5}
              onChange={(e, v) => handleRatingLong(v)}
            />
          </Grid>
          <div>
            {userRating && (
              <Paper
                variant="outlined"
                style={{
                  marginTop: 1,
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography style={{ fontSize: 12 }}>
                  You have rated this book with {userRating}
                </Typography>
                <StarIcon
                  style={{ fontSize: 16, marginBottom: 0.5, color: "#ffc400" }}
                  fontSize="small"
                />
              </Paper>
            )}
          </div>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {book.genres.map((item) => (
              <div className={classes.label}>
                <Typography style={{ color: "#fff" }} variant="body2">
                  {item}
                </Typography>
              </div>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {book.about_text.length > 400
                ? book.about_text.slice(0, 400)
                : book.about_text}
              {book.about_text.length > 400 && "..."}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/*<Button>Learn More</Button>*/}
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
          </div>
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
                Please login to rate this book
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
                You have already rated this book
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRated} color="primary" autoFocus>
                Okay
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Grid item xs={12}></Grid>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: "#fff",
  },
  label: {
    marginRight: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 40,
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
}));
