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
import Fade from "react-reveal/Fade";

export default function AllBooks(props) {
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
      <div className={classes.container}>
        <div
          style={{
            marginTop: 190,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Input
            id="outlined-basic"
            placeholder="Search books"
            className={classes.field}
            value={bookSearch}
            onChange={(e) => setBookSearch(e.target.value)}
            onBlur={() => apiSearch()}
            onSubmit={() => apiSearch()}
          />
          <Button
            className={classes.homeButton}
            onClick={() => {
              loadBooksByRating();
              setBookSearch("");
            }}
          >
            Clear
          </Button>
        </div>
        <Grid
          container
          alignContent="center"
          spacing={3}
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          {topRatedBooks.length > 0 &&
            !console.log(topRatedBooks) &&
            topRatedBooks.slice(0, maxLimit).map((item, index) => (
              <Fade left>
                <BookCard
                  book={item}
                  key={index}
                  userId={session.userId}
                  token={session.token}
                  history={props.history}
                />
              </Fade>
            ))}
          {maxLimit < topRatedBooks.length && (
            <Grid item justify="flex-end" xs={12} style={{}}>
              <Fade left>
                <div
                  style={{
                    width: "98%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Link
                    onClick={() => setMaxLimit(maxLimit + 4)}
                    style={{ cursor: "pointer" }}
                  >
                    View More
                  </Link>
                </div>
              </Fade>
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
  field: {
    fontSize: 23,
    padding: 7,
    height: 25,
    borderRadius: 0,
    borderWidth: 0,
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
