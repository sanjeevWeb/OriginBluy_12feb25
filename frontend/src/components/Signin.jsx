import React, { useEffect, useState } from "react";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; //
import { loginSuccess } from "../slices/userSlice";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";


const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form:", formData);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_BASE_URL + "/api/login",
        formData
      );
      console.log("Response:", response.data);

      // Dispatch to Redux
      dispatch(loginSuccess(response.data));

      // Redirect if login is successful
      if (response.data.token) {
        navigate("/upload");
      }
    } catch (error) {
      console.error("Signin error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/upload");
    }
  }, [navigate, user]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="flex justify-center items-center min-h-screen"
    >
      <Paper elevation={2} className="p-6 w-full">
        <Avatar className="mx-auto bg-blue-500">
          <LockPersonIcon />
        </Avatar>
        <Typography variant="h5" className="text-center my-4">
          Sign In
        </Typography>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <Box component="form" className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
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
            Sign In
          </Button>
        </Box>

        <Typography className="text-center mt-4 text-gray-600">
          Not signed up yet?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signin;
