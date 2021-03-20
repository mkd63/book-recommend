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

export default function Home(props) {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);
  const [bookSearch, setBookSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);

  const [preferredGenresBooks, setPreferredGenresBooks] = useState([]);
  const googleApiSearch = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookSearch}&key=AIzaSyBlWe_FxlfDWB2arFlrBrVOViUUmCHEY18`
    )
      .then((response) => response.json())
      .then((result) => {
        setBookData(result.items);
      });
  };

  const apiSearch = async () => {
    if (bookSearch.length > 0) {
      const response = await GETSEARCH(`/books/?search=${bookSearch}`);
      const result = await response.json();
      setSearchResults(result);
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
    }
  }, [session]);
  //
  // const renderCarousel = () => {
  //   return (
  //     <Carousel show={3}>
  //       {topRatedBooks.map((item) => (
  //         <BookCard
  //           book={item}
  //           token={session.token}
  //           userId={session.userId}
  //           history={props.history}
  //         />
  //       ))}
  //     </Carousel>
  //   );
  // };

  const renderCarouselMUI = () => {
    return (
      <CarouselMUI
        animation="slide"
        className={classes.carousel}
        autoPlay={false}
      >
        {topRatedBooks.map((item) => (
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
          <Typography
            style={{ fontSize: 80, fontFamily: "Roboto", fontWeight: "300" }}
          >
            Welcome to My Books
          </Typography>
          <Typography
            variant="body1"
            style={{
              textAlign: "center",
              fontFamily: "Roboto",
              width: 650,
              marginBottom: 65,
            }}
          >
            MyBooks is a website which recommends you books according to your
            taste. We use the approach of colaborative filtering to filter out
            the best reads for you !
          </Typography>
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
      {searchResults.length > 0 && (
        <div className={classes.searchResults}>
          <Typography variant="h5">Search results for {bookSearch}</Typography>
          <Grid container spacing={3} style={{ marginTop: 20 }}>
            {searchResults.map((item) => (
              <BookCard
                book={item}
                userId={session.userId}
                token={session.token}
                history={props.history}
              />
            ))}
          </Grid>
        </div>
      )}

      {session.token ? (
        preferredGenresBooks.length > 0 && (
          <div className={classes.searchResults}>
            <Typography variant="h5">
              Books recommended by your preferred genres
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 40 }}>
              {preferredGenresBooks.map((item) => (
                <BookCard
                  book={item}
                  userId={session.userId}
                  token={session.token}
                  history={props.history}
                />
              ))}
            </Grid>
          </div>
        )
      ) : (
        <Grid container className={classes.searchResults}>
          <Grid item xs={5}></Grid>
          <Grid item xs={7}></Grid>
        </Grid>
      )}

      <div className={classes.searchResults}>
        <Typography variant="h5">Top rated books</Typography>
        <Grid
          container
          spacing={3}
          style={{ marginTop: 40, marginBottom: 20, width: "100%" }}
        >
          {topRatedBooks.length > 0 && renderCarouselMUI()}
        </Grid>
      </div>
      <Footer />
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
    paddingLeft: 80,
    paddingRight: 80,
  },
  carousel: {
    width: "100%",
  },
}));
