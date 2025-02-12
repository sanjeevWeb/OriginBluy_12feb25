const userModel = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fileModel = require("../models/file.model.js");
const fs = require("fs");
const path = require("path");

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send({ error: 'All fields required' })
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new userModel({ username, email, password: hashedPassword });
        const newUser = await user.save();
        return res.status(201).send(newUser);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: 'All fields required' })
        }
        const user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).send({ user: user.username, token });
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

const userById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findOne({ id }).select('-password');
        console.log('user', user);
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
}

const fetchSavedMedia = async (req, res) => {
    try {
        const { _id } = req.user

        const allFiles = await fileModel.find({ user: _id });

        if (!allFiles.length) {
            return res.status(404).send({ message: 'No files found' });
        }

        return res.status(200).json({ success: true, files: allFiles });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
}

const fetchSingleMediaDetails = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.params
        const fileDetails = await fileModel.findOne({ id })
        if (!fileDetails) {
            return res.status(404).send({ message: 'No files found with this id' });
        }

        if (fileDetails.user !== user._id) {
            return res.status(401).send({ message: 'Not authorized to access this file' });

        }
        const fileUrl = `${process.env.BASE_URL}/uploads/${file.filename}`;
        return res.status(200).send(fileDetails, fileUrl);
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
}

const deleteFile = async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Construct file path
        const filePath = path.join(__dirname, "../../uploads", file.filename);

        // Delete file from filesystem
        fs.unlink(filePath, async (err) => {
            if (err) {
                console.error("File deletion error:", err);
                return res.status(500).json({ message: "Error deleting file from server" });
            }

            // Delete file from database
            await fileModel.findByIdAndDelete(req.params.id);

            res.status(200).json({ message: "File deleted successfully" });
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

module.exports = {
    registerUser,
    login,
    userById,
    fetchSavedMedia,
    fetchSingleMediaDetails,
    deleteFile
}