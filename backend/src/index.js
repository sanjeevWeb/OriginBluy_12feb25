require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user.route.js')
const connectDB = require('./database/index.js');
const { saveFileInfoToDB } = require('./controllers/file.controller.js');
const authenticate = require('./auth/authenticate.js');
const multer = require('multer')
const fs = require("fs");
// multer({ dest: "uploads/" });
const path = require("path")

const app = express()

// required middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//connecting db
connectDB(process.env.MONGODB_URI)

// reference to the 'uploads' directory
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // filename issue
    },
});


// File validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = /\.(jpeg|jpg|png|gif|mp4|pdf)$/;
    if (allowedTypes.test(path.extname(file.originalname).toLowerCase())) {
        cb(null, true);
    } else {
        cb(new Error("Only images, videos, and PDFs are allowed!"), false);
    }
};

// Set up Multer
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
    fileFilter,
});


// setting file limits and validations
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5000000 * 2 },
//     fileFilter: (req, file, cb) => {
//         const filetypes = "/.jpeg|.jpg|.png|.gif|.mp4|.pdf";
//         const extname = filetypes.test(
//             path.extname(file.originalname).toLowerCase()
//         );

//         if (extname) {
//             return cb(null, true);
//         } else {
//             cb("Error: Error");
//         }
//     },
// });

//route middlewares
app.use('/api', userRoute)

// single file upload
app.post("/api/upload", authenticate, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: "No file uploaded." });
        }

        //saving file info to database
        const savedFile = await saveFileInfoToDB(req.file, req.user);

        res.json({ success: true, msg: "File uploaded successfully", file: savedFile });
    } 
    catch (error) {
        res.status(500).json({ success: false, msg: "Internal server error", error });
    }
});


app.listen(4000, () => {
    console.log('running on port 4000');
})

