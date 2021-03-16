import React from 'react';
import clsx from 'clsx';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import {
	Icon
} from '@material-ui/core';

export default function DropzoneArea(props) {
	const classes = useStyles();
  return (
		<Dropzone onDrop={acceptedFiles => props.onSet(acceptedFiles[0])}>
		  {({getRootProps, getInputProps}) => (
		      <div {...getRootProps()}  className={clsx(classes.dropzoneBorder, "dropzoneBorder")} >
		        <input {...getInputProps()} />
						<Icon fontSize="large" component={CloudUploadIcon} />
		      </div>
		  )}
		</Dropzone>
	);
}

const useStyles = makeStyles(() => ({
  dropzoneBorder: {
		margin: "0 40px",
		borderRadius: "50%",
    border: "2px dashed rgba(255, 255, 255, 0.7) !important",
		padding: 16,
		width: 150,
		height: 150,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer"
  },
}));
