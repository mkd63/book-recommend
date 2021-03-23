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

export default function AllBooks(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);
  const [bookSearch, setBookSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [crBooks, setCrBooks] = useState([]);
  const [preferredGenresBooks, setPreferredGenresBooks] = useState([]);
  const [maxLimit, setMaxLimit] = useState(4);
  const loadBooksByRating = async () => {
    const response = await GET("/books");
    const result = await response.json();
    setTopRatedBooks(result);
    console.log(result, "books rating");
  };
  useEffect(() => {
    loadBooksByRating();
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid
          container
          alignContent="center"
          spacing={3}
          style={{
            marginTop: 40,
            marginBottom: 20,
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          {topRatedBooks.length > 0 &&
            topRatedBooks
              .slice(0, maxLimit)
              .map((item) => (
                <BookCard
                  book={item}
                  userId={session.userId}
                  token={session.token}
                  history={props.history}
                />
              ))}
          {maxLimit < topRatedBooks.length && (
            <Grid item justify="flex-end" xs={12} style={{}}>
              <div
                style={{
                  width: "98%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Link onClick={() => setMaxLimit(maxLimit + 4)}>View More</Link>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
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
}));
