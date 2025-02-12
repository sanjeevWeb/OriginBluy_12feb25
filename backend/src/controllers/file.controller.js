const fileModel = require('../models/file.model');
const userModel = require('../models/user.model');

const saveFileInfoToDB = async (file, user) => {
    try {
        // console.log("File received:", file);
        // console.log("User:", user);

        const { filename, mimetype } = file;

        const newFile = new fileModel({ filename, mimetype, user: user._id });
        const savedFile = await newFile.save();

        await userModel.findByIdAndUpdate(user._id, {
            $push: { files: savedFile._id }
        });

        return savedFile;
    } catch (error) {
        console.error("Error saving file:", error);
        throw error;
    }
};


module.exports = {
    saveFileInfoToDB
}