import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/book.png";

const UserPicture = (props) => {
  const classes = useStyles();

  const [pic, setPic] = useState(null);

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
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
      const picture = await getCroppedImg(img, crop, "user_pic.jpeg");
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

  return <img className={classes.pic} alt="user pic" src={pic} />;
};

export default UserPicture;

const useStyles = makeStyles(() => ({
  pic: {
    width: "100%",
    height: "100%",
  },
}));
