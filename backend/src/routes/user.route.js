const express = require('express');
const { registerUser, login, userById, fetchSavedMedia, fetchSingleMediaDetails, deleteFile } = require('../controllers/user.controller.js');
const authenticate = require('../auth/authenticate.js');

const router = express.Router();

router.post('/register', registerUser)

router.post('/login', login)

router.get('/user/:id', userById)

router.get('/media', authenticate, fetchSavedMedia)

router.get('/media/:id', authenticate, fetchSingleMediaDetails)

router.delete("/media/:id", authenticate, deleteFile);


module.exports = router