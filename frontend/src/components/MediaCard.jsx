import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Dialog } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedia } from "../slices/mediaSlice";
import SourceIcon from '@mui/icons-material/Source';
import defaultImg from '../assets/default_img.jpg'
import axios from "axios";

const MediaCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(null);
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token)

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token') || ""
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/media/${id}`, {
        headers: {
          'Authorization': token,
        }
      });
      dispatch(deleteMedia(item.id));
      return { id, message: response.data };
    }
    catch (error) {
      console.log(error);;
    }

  };

  const handleClick = async (id) => {
    try {
      const token = localStorage.getItem('token') || ""
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/media/${id}`, {
        headers: {
          'Authorization': token,
        }
      });
      setMediaUrl(response.data.url); // assuming the API returns a URL to the media file
      setOpen(true);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  }

  return (
    <>
      <Card className="shadow-md">
        <CardMedia component="img" height="200" image={defaultImg} alt={item.filename} />
        <CardContent>
          <Typography variant="h6">{item.filename}</Typography>
          <Typography variant="h6">{item.mimetype}</Typography>
          <IconButton onClick={() => handleDelete(item._id)} className="text-red-500">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleClick(item.id)} className="text-red-500">
            <SourceIcon />
          </IconButton>
        </CardContent>
      </Card>

      {/* Modal/Dialog for displaying media */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        {mediaUrl ? (
          item.mimetype.startsWith("image/") ? (
            <img src={mediaUrl} alt={item.filename} className="w-full h-auto" />
          ) : item.mimetype.startsWith("video/") ? (
            <video controls className="w-full">
              <source src={mediaUrl} type={item.mimetype} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Unsupported file type</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </Dialog>
    </>
  );
};

export default MediaCard;
