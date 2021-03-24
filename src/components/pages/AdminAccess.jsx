import React, { Fragment, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { GlobalContext } from "../../context/GlobalContext";
import {
  Box,
  FormControl,
  TextField,
  IconButton,
  Button,
  Typography,
  Grid,
  Link,
  Chip,
} from "@material-ui/core";
import { Input } from "reactstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import bookshelfBg from "../../assets/bookshelf-illustration.jpg";
import { POST } from "../../actions/api";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PictureUpload from "../picture-upload/ProfilePicture";

export default function Register(props) {
  const classes = useStyles();
  const { setSession } = useContext(GlobalContext);
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);

  const submit = async () => {
    const body = {
      key: key,
    };
    const response = await POST(`/users/admin`, body);
    const result = await response.json();
    if (result.success) {
      props.history.push("/admin");
    }
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

        <div className={classes.form}>
          <Input
            id="outlined-basic"
            placeholder="Search books"
            className={classes.field}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onBlur={() => submit()}
            onSubmit={() => submit()}
          />
          {error && (
            <Typography className={classes.error}>Invalid key !</Typography>
          )}
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
  field: {
    fontSize: 23,
    padding: 7,
    height: 25,
    borderRadius: 0,
    borderWidth: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    marginTop: 10,
    color: "red",
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
}));
