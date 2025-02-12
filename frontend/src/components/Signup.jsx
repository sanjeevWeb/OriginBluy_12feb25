import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Ensure React Router is set up
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar
} from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for redirection
  // const { userInfo, success, error } = useSelector((state) => state.auth); // Get user state from Redux

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Ensure input field names match
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form:", formData);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_BASE_URL + "/api/register",
        formData
      );
      console.log("Response:", response.data);

      // Redirect if successful
      if (response.data.username) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  // useEffect(() => {
  //   // Redirect user after successful registration
  //   if (success) navigate("/login");
  //   // if (userInfo) navigate("/upload");
  // }, [navigate, success]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="flex justify-center items-center min-h-screen"
    >
      <Paper elevation={3} className="p-6 w-full">
      <Avatar className="mx-auto bg-blue-500">
          <AppRegistrationIcon />
        </Avatar>
        <Typography variant="h5" className="text-center mb-4">
          Sign Up
        </Typography>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <Box component="form" className="space-y-3" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username" 
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email" 
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Sign Up
          </Button>
        </Box>
        <Typography className="text-center mt-4 text-gray-600">
          Already signed up ?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;
