import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addMedia } from "../slices/mediaSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { Divider } from '@mui/material';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_BASE_URL + "/api/upload", formData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("file response", res.data);
            dispatch(addMedia(res.data));
            setFile(null);
        }
        catch (error) {
            console.error("Upload failed", error);
        }
    };

    return (
        <div className="flex items-center space-x-2 flex-col">
            <TextField type="file" onChange={handleFileChange} margin="normal"/>
            <Button onClick={handleUpload} variant="contained" className="bg-blue-500 text-white">
                Upload
            </Button>
            <Divider></Divider>
            <Typography className="text-center mt-4 text-gray-600" style={{whiteSpace: 'pre-line'}}>
                Your previous uploads{" "}
                <Link to="/dashboard" className="text-blue-500 hover:underline">
                    See here
                </Link>
            </Typography>
        </div>
    );
};

export default UploadForm;
