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
  Grid,
  Link,
} from "@material-ui/core";
import bookshelfBg from "../../assets/bookshelf-illustration.jpg";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { POST } from "../../actions/api";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const genreOptions = [
  "Mystery",
  "Fantasy",
  "Comedy",
  "Memoir",
  "Historical Drama",
  "Southern Gothic",
];

export default function Register(props) {
  const classes = useStyles();
  const { setSession } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    dob: "1998-11-10",
    gender: "Male",
  });
  const [helperText, setHelperText] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [genreSet, setGenreSet] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    console.log(displayError);
  }, [displayError]);

  const required = (value) => {
    console.log(value);
    if (!value.toString().trim().length) {
      return true;
    }
  };
  function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(formData.email) == false) {
      error["email"] = true;
      helperText["email"] = "Email is in incorrect format";
    }
  }
  function checkPasswords() {
    if (formData.password !== formData.confirmPassword) {
      error["password"] = true;
      error["confirmPassword"] = true;
    }
  }
  const validateForm = () => {
    Object.keys(formData).forEach(function (key) {
      console.log(key);
      if (required(formData[key])) {
        helperText[key] = "This item is required";
        error[key] = true;
      }
    });
    validateEmail();
    checkPasswords();
  };

  const handleRegister = async () => {
    validateForm();
    const body = formData;
    body["preferred_genres"] = genreSet;
    console.log(body);
    const response = await POST("/users", body);
    if (response.status > 300) {
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
            Create your account and find best reads for you.
          </h4>
          <div
            style={{
              width: 350,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth error={displayError}>
                  <InputLabel htmlFor="first-name">First Name</InputLabel>

                  <Input
                    id="first-name"
                    label="First Name"
                    type="first-name"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        first_name: e.target.value,
                      })
                    }
                    style={{ color: "#fff" }}
                    error={error.first_name}
                    helperText={helperText.first_name}
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
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={displayError}>
                  <InputLabel htmlFor="last-name">Last Name</InputLabel>

                  <Input
                    id="last-name"
                    label="Last Name"
                    type="text"
                    error={error.last_name}
                    helperText={helperText.last_name}
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        last_name: e.target.value,
                      })
                    }
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
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={displayError}>
                  <InputLabel htmlFor="username">Username</InputLabel>

                  <Input
                    id="username"
                    label="Username"
                    error={error.username}
                    helperText={helperText.username}
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value,
                      })
                    }
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
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={displayError}>
                  <InputLabel htmlFor="email">Email</InputLabel>

                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    error={error.email}
                    helperText={helperText.email}
                    autoComplete="current-email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
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
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={genreOptions}
                  freeSolo
                  onChange={(event, newValue) => {
                    setGenreSet(newValue);
                  }}
                  limitTags={2}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="Favorite Genres"
                      placeholder="Favorite Genres"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={displayError}>
                  <InputLabel htmlFor="password">Password</InputLabel>

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    error={error.password}
                    helperText={helperText.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
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
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={displayError}>
                  <InputLabel htmlFor="confirm-password">
                    Confirm Password
                  </InputLabel>

                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    error={error.confirmPassword}
                    helperText={helperText.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box width={1} align="center" mt={2}>
              {displayError && (
                <Typography className={classes.error}>
                  Invalid user email or password
                </Typography>
              )}
            </Box>

            <Button className={classes.button} onClick={() => handleRegister()}>
              Register
            </Button>
            <Link href="/login" style={{ color: "#fff" }}>
              Already have an account ? Login here
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
    height: 700,
    background: "rgba(255, 140, 0, 0.84)",
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
  cssFocused: {
    color: "#fff !important",
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#fff !important",
  },
}));
