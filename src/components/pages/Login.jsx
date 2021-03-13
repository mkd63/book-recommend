import React, { Fragment, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { GlobalContext } from "../../context/GlobalContext";
import {
  Box,
  FormControl,
  TextField,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import bookshelfBg from "../../assets/bookshelf-illustration.jpg";
import { POST } from "../../actions/api";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function Login(props) {
  const classes = useStyles();
  const { setSession } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    console.log(displayError);
  }, [displayError]);
  const handleLogin = async () => {
    const body = {
      email: email,
      password: password,
    };

    const response = await POST("/auth/login", body);
    console.log("logres", response.status);
    const result = await response.json();

    if (response.status === 200) {
      setSession({
        token: result.token,
        userId: result.user.id,
        username: result.user.username,
        userFirstName: result.user.first_name,
        userLastName: result.user.last_name,
        userPicture: result.user.picture,
        userCrop: result.user.cropped_data,
        userIsSetup: result.user.is_setup,
      });
    } else {
      setDisplayError(true);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Button
          className={classes.homeButton}
          onClick={() => props.history.push("/")}
        >
          Home
        </Button>
        <div className={classes.loginBox}>
          <h3 className={classes.textHead1}>Welcome to MyBooks</h3>
          <h4 className={classes.textHead2}>
            Login and find the best read for you
          </h4>
          <div
            style={{
              width: 250,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FormControl
              style={{ marginTop: 20 }}
              fullWidth
              error={displayError}
            >
              <InputLabel htmlFor="email">Email</InputLabel>

              <Input
                id="email"
                label="Email"
                type="email"
                autoComplete="current-email"
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: "#fff" }}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                  },
                }}
              />
            </FormControl>
            <FormControl
              style={{ marginTop: 15 }}
              fullWidth
              error={displayError}
            >
              <InputLabel htmlFor="login-password">Password</InputLabel>

              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: "#fff" }}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box width={1} align="center" mt={2}>
              {displayError && (
                <Typography className={classes.error}>
                  Invalid user email or password
                </Typography>
              )}
            </Box>

            <Button
              style={{
                opacity:
                  displayError || email.length === 0 || password.length === 0
                    ? 0.85
                    : 1,
              }}
              className={classes.button}
              onClick={() => handleLogin()}
            >
              Login
            </Button>
            <Link href="/register" style={{ color: "#fff" }}>
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "hidden",
    height: "100vh",
    flexGrow: 1,
  },
  container: {
    backgroundImage: `url(${bookshelfBg})`,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textfield: {
    marginTop: 50,
    width: 250,
    height: 14,
    fontFamily: "monospace",
  },
  loginBox: {
    width: 520,
    height: 450,
    background: "rgba(38,219,28,0.84)",
    boxShadow: "0 3px 5px 2px rgba(0,0,0, .3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textHead1: {
    marginTop: 45,
    fontFamily: "monospace",
    fontSize: 20,
    color: "#fff",
  },

  textHead2: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
  },

  cssLabel: {
    color: "#fff",
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `#fff !important`,
    },
  },

  homeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fe9505",
    color: "#D5D5D5",
    "&:hover": {
      color: "#fe9505",
      backgroundColor: "#D5D5D5",
    },
  },
  error: {
    color: "red",
  },
  button: {
    backgroundColor: "#1C1C1C",
    marginTop: 58,
    color: "#D5D5D5",
    "&:hover": {
      color: "#1C1C1C",
      backgroundColor: "#D5D5D5",
    },
  },
  cssFocused: {
    color: "#fff !important",
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#fff !important",
  },
}));
