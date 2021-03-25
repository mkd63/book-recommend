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
import CarouselMUI from "react-material-ui-carousel";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "@material-ui/core";
import bookshelfBg from "../../assets/home-books-bg.jpg";
import bookSample from "../../assets/book-sample.png";
import bookCollec from "../../assets/book-collec.png";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import welcomeText from "../../assets/welcomeText.svg";
import TextField from "@material-ui/core/TextField";
import { Input } from "reactstrap";
import { GETSEARCH, GET } from "../../actions/api";
import Carousel from "../uiComponents/Carousel/Carousel";
import "../uiComponents/Carousel/Carousel.css";
import BookCard from "../uiComponents/BookCard";
import BookCardLong from "../uiComponents/BookCardLong.jsx";
import Footer from "../uiComponents/Footer.jsx";

export default function About(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);
  const [bookSearch, setBookSearch] = useState("");
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [maxLimit, setMaxLimit] = useState(4);
  const loadBooksByRating = async () => {
    const response = await GET("/books");
    const result = await response.json();
    setTopRatedBooks(result);
  };

  const apiSearch = async () => {
    if (bookSearch.length > 0) {
      const response = await GETSEARCH(`/books/?search=${bookSearch}`);
      const result = await response.json();

      setTopRatedBooks(result);
    }
  };

  useEffect(() => {
    loadBooksByRating();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <div className={classes.imageContainerCover}>
          {/*<img src={welcomeText} style={{ marginBottom: 5 }} />*/}
          <Typography
            style={{
              fontSize: 80,
              fontFamily: "Roboto",
              fontWeight: "300",
              color: "#fff",
            }}
          >
            About My Books
          </Typography>
          <Typography
            variant="body1"
            style={{
              textAlign: "center",
              fontFamily: "Roboto",
              width: 650,
              color: "#fff",
              marginBottom: 65,
            }}
          >
            MyBooks is a website which recommends you books according to your
            taste. We use the approach of colaborative filtering to filter out
            the best reads for you !
          </Typography>
        </div>
      </div>
      <Grid
        container
        direction="column"
        style={{ padding: "5rem 5rem", color: "#fff", background: "#30638E" }}
      >
        <Grid item xs={12} style={{ marginBottom: 15 }}>
          <Typography variant="h4" className={classes.question}>
            What exactly is My Books ?
          </Typography>
          <Typography variant="body1">
            MyBooks is a website which recommends you books according to your
            taste. It does so based on your ratings on various books.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.question}>
            How does it work ?
          </Typography>
          <Typography variant="body1">
            It works on the concept of collaborative filtering. According to
            this concept, It recommends books by generating ratings for all the
            books based on the ratings given by the user to some of the books.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    flexGrow: 1,
  },
  container: {
    paddingLeft: 150,
    paddingRight: 120,
  },
  field: {
    fontSize: 23,
    padding: 7,
    height: 25,
    borderRadius: 0,
    borderWidth: 0,
  },
  imageContainer: {
    backgroundImage: `url(${bookshelfBg})`,
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "500px",
    justifyContent: "center",
  },
  imageContainerCover: {
    width: "100%",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  homeButton: {
    height: 38,
    borderRadius: 0,

    backgroundColor: "#fe9505",
    color: "#D5D5D5",
    "&:hover": {
      color: "#fe9505",
      backgroundColor: "#D5D5D5",
    },
  },
}));
