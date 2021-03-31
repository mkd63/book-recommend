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
import bookCollec from "../../assets/book-deck.png";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import welcomeText from "../../assets/welcomeText.svg";
import TextField from "@material-ui/core/TextField";
import { Input } from "reactstrap";
import { GETSEARCH, GET, POST } from "../../actions/api";
import Carousel from "../uiComponents/Carousel/Carousel";
import "../uiComponents/Carousel/Carousel.css";
import BookCard from "../uiComponents/BookCard";
import BookCardLong from "../uiComponents/BookCardLong.jsx";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";

export default function Home(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);
  const [bookSearch, setBookSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [crBooks, setCrBooks] = useState([]);
  const [preferredGenresBooks, setPreferredGenresBooks] = useState([]);

  const apiSearch = async () => {
    if (bookSearch.length > 0) {
      const response = await GETSEARCH(`/books/?search=${bookSearch}`);
      const result = await response.json();
      setSearchResults(result);
    } else if (bookSearch.length === 0) {
      setSearchResults([]);
    }
  };
  const loadBooksByRating = async () => {
    const response = await GET("/books");
    const result = await response.json();
    setTopRatedBooks(result);
    console.log(result, "books rating");
  };

  const loadRecommendedBooksByGenre = async () => {
    console.log(session.username);
    const response = await GET(
      `/books/books_genre_recommendation?username=${session.username}`
    );
    const result = await response.json();
    console.log(result, "books rating");
    setPreferredGenresBooks(result);
  };

  const serialize = (obj) => {
    for (let i = 0; i < obj.length; i++) {
      console.log("onjarr", obj[i].fields.author);
      obj[i].fields.author = JSON.parse(obj[i].fields.author);
    }
  };
  const loadCollaborativeFilteringRecommendations = async () => {
    const response = await POST(
      `/ratings/recommendations`,
      { username: session.username },
      session.token
    );
    const result = await response.json();
    serialize(result);
    console.log("crbooks", result);
    setCrBooks(result);
  };

  const loadBooks = async () => {
    const response = await GET("/books");
    const result = await response.json();

    console.log(result, "books");
  };
  useEffect(() => {
    console.log("book data", bookData);
  }, [bookData]);

  useEffect(() => {
    console.log(session);

    loadBooks();
    loadBooksByRating();
    if (session.username) {
      loadRecommendedBooksByGenre();
      loadCollaborativeFilteringRecommendations();
    }
  }, [session]);

  const flattenCrBook = (item) => {
    let result = item.fields;
    result["id"] = item.pk;
    return result;
  };
  const renderCarouselMUI = () => {
    return (
      <CarouselMUI animation="slide" className={classes.carousel}>
        {topRatedBooks.slice(0, 5).map((item) => (
          <BookCardLong
            loadBooksByRating={loadBooksByRating}
            book={item}
            userId={session.userId}
            token={session.token}
            history={props.history}
          />
        ))}
      </CarouselMUI>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <div className={classes.imageContainerCover}>
          {/*<img src={welcomeText} style={{ marginBottom: 5 }} />*/}
          <Slide left>
            <Typography
              style={{
                fontSize: 80,
                fontFamily: "Roboto",
                fontWeight: "300",
                color: "#303f9f",
              }}
            >
              Welcome to My Books
            </Typography>
          </Slide>
          <Slide left>
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                fontFamily: "Roboto",
                width: 650,
                marginBottom: 65,
                color: "#303f9f",
              }}
            >
              MyBooks is a website which recommends you books according to your
              taste. We use the approach of collaborative filtering to filter
              out the best reads for you !
            </Typography>
          </Slide>
          <Input
            id="outlined-basic"
            placeholder="Search books"
            className={classes.field}
            value={bookSearch}
            onChange={(e) => setBookSearch(e.target.value)}
            onBlur={() => apiSearch()}
            onSubmit={() => apiSearch()}
          />
        </div>
      </div>
      <div
        style={{
          height: 170,
          backgroundColor: "#303f9f",
          padding: "30px 70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Slide left>
          <div>
            <img src={bookCollec} style={{ width: 270, height: 152 }} />
          </div>
        </Slide>
        <Slide right>
          <div>
            <Typography
              style={{
                color: "#FFF",
                fontWeight: "500",
                fontSize: 30,
                width: 590,
              }}
            >
              {session.token ? "Start finding" : "Register and find"} the best
              reads for you. Get books recommended based on your taste.
            </Typography>
          </div>
        </Slide>
      </div>
      {searchResults.length > 0 && (
        <div>
          <div className={classes.headContainer}>
            <Slide left>
              {" "}
              <Typography variant="h5" className={classes.head}>
                Search Results for {bookSearch}
              </Typography>
            </Slide>
          </div>
          <div className={classes.searchResults}>
            <Grid
              container
              spacing={3}
              style={{
                marginTop: 40,
                marginBottom: 40,
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              {searchResults.map((item) => (
                <Fade left>
                  <BookCard
                    book={item}
                    userId={session.userId}
                    token={session.token}
                    history={props.history}
                  />
                </Fade>
              ))}
            </Grid>
          </div>
        </div>
      )}

      {session.token && preferredGenresBooks.length > 0 && (
        <div>
          <div className={classes.headContainer}>
            <Slide left>
              <Typography variant="h5" className={classes.head}>
                Books based on your preferred genres
              </Typography>
            </Slide>
          </div>
          <div className={classes.searchResults}>
            <Grid
              container
              spacing={3}
              style={{
                marginTop: 40,
                marginBottom: 40,
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              {preferredGenresBooks.slice(0, 8).map((item) => (
                <Fade left>
                  <BookCard
                    book={item}
                    userId={session.userId}
                    token={session.token}
                    history={props.history}
                  />
                </Fade>
              ))}
            </Grid>
          </div>
        </div>
      )}

      {session.token && crBooks.length > 0 && (
        <div>
          <div className={classes.headContainer}>
            <Slide left>
              <Typography variant="h5" className={classes.head}>
                Books recommended using collaborative filtering
              </Typography>
            </Slide>
          </div>
          <div className={classes.searchResults}>
            <Grid
              container
              spacing={3}
              style={{
                marginTop: 40,
                marginBottom: 40,
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              {crBooks.slice(0, 8).map((item) => (
                <Fade left>
                  <BookCard
                    book={flattenCrBook(item)}
                    userId={session.userId}
                    token={session.token}
                    history={props.history}
                  />
                </Fade>
              ))}
            </Grid>
          </div>
        </div>
      )}
      <div>
        <div className={classes.headContainer}>
          <Slide left>
            <Typography variant="h5" className={classes.head}>
              Top rated books
            </Typography>
          </Slide>
        </div>
        <div className={classes.searchResults}>
          <Grid
            container
            spacing={3}
            style={{ marginTop: 40, marginBottom: 20, width: "100%" }}
          >
            {topRatedBooks.length > 0 && renderCarouselMUI()}
          </Grid>
        </div>
      </div>

      <div>
        <div className={classes.headContainer}>
          <Slide left>
            <Typography variant="h5" className={classes.head}>
              Start Rating a few books to get the best recommendations
            </Typography>
          </Slide>
        </div>
        <div className={classes.searchResults}>
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
              topRatedBooks.slice(0, 8).map((item) => (
                <Fade left>
                  <BookCard
                    book={item}
                    userId={session.userId}
                    token={session.token}
                    history={props.history}
                  />
                </Fade>
              ))}
            <Grid item justify="flex-end" xs={12} style={{}}>
              <div
                style={{
                  width: "98%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="/allbooks">View All</Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      {/*<div className={classes.searchResults}>
        <Typography variant="h5">Top rated books</Typography>
        <Grid
          container
          spacing={3}
          style={{ marginTop: 40, marginBottom: 200, width: "100%" }}
        >
          {topRatedBooks.length > 0 && renderCarousel()}
        </Grid>
      </div>*/}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    flexGrow: 1,
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
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  innerContainer: {
    width: "45%",
    height: "500px",
    backgroundColor: "#1c217c",
  },
  field: {
    fontSize: 23,
    padding: 7,
    borderRadius: 5,
    borderWidth: 0,
  },
  searchResults: {
    marginTop: 50,
    paddingLeft: 150,
    paddingRight: 120,
  },
  headContainer: {
    backgroundColor: "#fe9505",
    padding: 15,
    display: "flex",
    justifyContent: "center",
  },
  head: {
    fontSize: "2.6rem",
    fontWeight: "500",
    color: "#fff",
    width: 570,
    textAlign: "center",
  },
  carousel: {
    width: "100%",
  },
}));
