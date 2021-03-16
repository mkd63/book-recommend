import React, { Fragment, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Grid, Box, Hidden, Typography, Button } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "@material-ui/core";
import Home from "./Home";
import bookLogo from "../../assets/book.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { POST } from "../../actions/api";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function Authentication(props) {
  const classes = useStyles();
  const { session, setSession } = useContext(GlobalContext);

  const { from } = props.location.state || {
    from: { pathname: `/${session.username}` },
  };
  const preventDefault = (event) => event.preventDefault();
  const [bookData, setBookData] = useState("");
  const loggedIn = (username) => {
    props.history.push({
      pathname: `/${username}`,
    });
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    handleClose();
    const response = await POST("/auth/logout");
    if (response.status === 200) {
      setSession({
        token: null,
        userId: null,
        userFirstName: null,
        userLastName: null,
        userImg: null,
      });
    }
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      style={{ top: -295 }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY, process.env.REACT_APP_API_URL);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=harry&key=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => {
        setBookData(result.items);
      });
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={bookLogo} style={{ height: 35, width: 35 }}></img>
          <h3 className={classes.logoText}>MyBooks</h3>
        </div>
        <div className={classes.options}>
          <Link
            className={classes.optionText}
            href="#"
            onClick={preventDefault}
            color="inherit"
          >
            Home
          </Link>
          <Link
            className={classes.optionText}
            href="#"
            onClick={preventDefault}
            color="inherit"
          >
            Find MyBook
          </Link>

          <Link
            className={classes.optionText}
            href="#"
            onClick={preventDefault}
            color="inherit"
          >
            About
          </Link>
          {!session.token ? (
            <div className={classes.options}>
              <Link
                className={classes.optionText}
                href="/login"
                color="inherit"
              >
                Login
              </Link>
              <div
                style={{
                  width: 0.5,
                  height: 23,
                  background: "rgba(0,0,0,0.54)",
                  marginTop: 2,
                  marginLeft: 6,
                  marginRight: 6,
                }}
              />
              <Link
                className={classes.optionText}
                style={{ marginLeft: 0 }}
                href="/register"
                color="inherit"
              >
                Register
              </Link>
            </div>
          ) : (
            <div>
              <Button
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => setAnchorEl(true)}
                startIcon={<AccountCircleIcon />}
                style={{ marginLeft: 14 }}
              >
                {session.userFirstName + " " + session.userLastName}
              </Button>
              {renderMenu}
            </div>
          )}
        </div>
      </div>
      <Route exact path="/" component={Home} />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    zIndex: 2000,
    backgroundColor: "#FFF",
    width: "100%",
    padding: 15,
    height: 70,
    position: "fixed",
    top: 0,
    boxShadow: "0 3px 5px 2px rgba(0,0,0, .3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoText: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: "cursive",
    fontSize: 16,
    color: "#21ff00",
  },
  boxPrimary: {
    background: "#4B7BEC",
  },
  flex: {
    margin: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logo: {
    height: 55,
    width: 55,
    marginRight: 10,
  },
  name: {
    color: "#000",
  },
  options: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: 35,
  },
  optionText: {
    marginLeft: 18,
    fontSize: 14,
    lineHeight: 18,
    color: "#000",
    fontWeight: "500",
    "&:hover": {
      color: "#0066ff",
    },
  },
}));
