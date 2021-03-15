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
import { POST } from "../../actions/api";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export default function Register(props) {
  const classes = useStyles();
  const { setSession } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    genres: "",
    picture: "",
    about_text: "",
    rating: 2,
  });
  const [author, setAuthor] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    console.log(displayError);
  }, [displayError]);

  const addauthor = () => {
    if (formData.author !== "") {
      author.push(formData.author);

      setFormData({
        ...formData,
        author: "",
      });
    }
  };

  const addgenre = () => {
    if (formData.genres !== "") {
      genres.push(formData.genres);
      setFormData({
        ...formData,
        genres: "",
      });
    }
  };

  const required = (value) => {
    console.log(value);
    if (!value.toString().trim().length) {
      return true;
    }
  };

  const handleRegister = async () => {
    const body = {
      name: formData.name,
      author: author,
      genres: genres,
      about_text: formData.about_text,
      picture: formData.picture,
      rating: formData.rating,
    };

    const response = await POST("/books", body);
    console.log("book added ", response);
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
          <h3 className={classes.textHead1}>Admin Portal</h3>
          <h4 className={classes.textHead2}>Add books</h4>
          <div
            style={{
              width: 350,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="name">First Name</InputLabel>

                  <Input
                    id="name"
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
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
              <Grid item xs={9}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="author">Author</InputLabel>

                  <Input
                    id="author"
                    label="Author"
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: e.target.value,
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
              <Grid item xs={3}>
                <IconButton
                  onClick={addauthor}
                  component="span"
                  style={{ marginTop: 15, paddingLeft: 0 }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Grid>
              {author.length > 0 && (
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {author.map((item) => (
                    <div className={classes.label}>
                      <Typography style={{ color: "#fff" }} variant="body2">
                        {item}
                      </Typography>
                    </div>
                  ))}
                </Grid>
              )}
              <Grid item xs={9}>
                <FormControl fullWidth error={displayError}>
                  <InputLabel htmlFor="genres">Genres</InputLabel>

                  <Input
                    id="genres"
                    label="Genres"
                    type="text"
                    value={formData.genres}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        genres: e.target.value,
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

              <Grid item xs={3}>
                <IconButton
                  onClick={addgenre}
                  component="span"
                  style={{ marginTop: 15, paddingLeft: 0 }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Grid>
              {genres.length > 0 && (
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {genres.map((item) => (
                    <div className={classes.label}>
                      <Typography style={{ color: "#fff" }} variant="body2">
                        {item}
                      </Typography>
                    </div>
                  ))}
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControl fullWidth error={displayError}>
                  <InputLabel htmlFor="picture">Picture</InputLabel>

                  <Input
                    id="picture"
                    label="Picture"
                    type="text"
                    value={formData.picture}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        picture: e.target.value,
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
                <FormControl fullWidth>
                  <InputLabel htmlFor="about-text">About text</InputLabel>

                  <Input
                    id="about-text"
                    type="text"
                    value={formData.about_text}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about_text: e.target.value,
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
            </Grid>
            <Box width={1} align="center" mt={2}>
              {displayError && (
                <Typography className={classes.error}>
                  Invalid user email or password
                </Typography>
              )}
            </Box>

            <Button className={classes.button} onClick={() => handleRegister()}>
              Submit
            </Button>
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
    height: 650,
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
    marginTop: 18,
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
