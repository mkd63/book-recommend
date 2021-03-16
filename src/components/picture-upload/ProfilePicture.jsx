import React, { useState, useContext, useEffect, useCallback } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DropzoneArea from "./Dropzone";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Box, Icon, Typography, Button } from "@material-ui/core";
import logo from "../../assets/book.png";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { PATCH } from "../../actions/api";

const ProfilePicture = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [pic, setPic] = useState(null);

  const [newPicLoaded, setNewPicLoaded] = useState(false);
  const [newPic, setNewPic] = useState(null);
  const [adjustedPic, setAdjustedPic] = useState(null);
  const [newCrop, setNewCrop] = useState({
    aspect: 1,
    unit: "%",
    width: 100,
    height: 100,
  });

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const imageWidth = crop.imageWidth || image.width;
    const imageHeight = crop.imageHeight || image.height;
    const scaleX = image.naturalWidth / imageWidth;
    const scaleY = image.naturalHeight / imageHeight;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As a blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        const fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  const loadPic = useCallback(async (url, crop) => {
    var img = new Image();
    img.src = url;
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = async () => {
      const picture = await getCroppedImg(img, crop, "profile_pic.jpeg");
      setPic(picture);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (props.picture)
        loadPic(JSON.parse(props.picture).url, JSON.parse(props.crop));
      else setPic(logo);
    })();
  }, [loadPic, props.picture, props.crop]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePicSet = (pic) => {
    let reader = new FileReader();
    reader.readAsDataURL(pic);
    reader.onload = () => {
      setNewPic(reader.result);
      setNewPicLoaded(true);
      return true;
    };
  };

  const onImageLoaded = (image) => {
    setAdjustedPic(image);
  };

  const handleSave = async () => {
    newCrop["imageWidth"] = adjustedPic.width;
    newCrop["imageHeight"] = adjustedPic.height;
    let body = {
      picture: newPic,
      cropped_data: newCrop,
    };
    loadPic(newPic, newCrop);
    props.setData({
      ...props.data,
      picture: newPic,
      cropped_data: newCrop,
    });

    setNewPic(null);
    setNewPicLoaded(false);
    setNewCrop({
      aspect: 1,
      unit: "%",
      width: 100,
      height: 100,
    });
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Box
        width={1}
        height="100%"
        className={clsx(classes.editProfilePicture, classes.root)}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {pic && <img className={classes.profilePicture} alt="logo" src={pic} />}

        <Box
          width={1}
          height="100%"
          onClick={handleOpen}
          className={clsx(classes.overlay, "showOverlayOnHover")}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Icon className={classes.largeIcon} component={CameraAltIcon} />
        </Box>
      </Box>
      <Dialog
        maxWidth="lg"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div style={{ color: "#fff" }}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Upload Picture
          </DialogTitle>
          <DialogContent>
            {newPicLoaded ? (
              <ReactCrop
                className={classes.reactCrop}
                src={newPic}
                crop={newCrop}
                keepSelection={true}
                onImageLoaded={onImageLoaded}
                onChange={(newCrop) => setNewCrop(newCrop)}
              />
            ) : (
              <DropzoneArea onSet={(pic) => handlePicSet(pic)} />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfilePicture;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  editProfilePicture: {
    borderRadius: "50%",
    boxShadow: "0px 1px 1px #111111",
    height: 50,
    width: 50,
    padding: "0px !important",
    position: "relative",
    margin: "0 auto",
    cursor: "pointer",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
  reactCrop: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  largeIcon: {
    transform: "scale(2)",
  },
  overlay: {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "rgba(38,43,47, 0.5) !important",
  },
  opacityHide: {
    opacity: 0,
  },
  opacityShow: {
    opacity: 1,
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
