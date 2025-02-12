const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')


const authenticate = async (req, res, next) => {
    try {
        let token = req.headers['authorization'] || req.headers['Authorization']
        if (!token) {
            return res.status(400).json({ success: false, msg: "Required credentials" })
        }
        // token = token.substring(7);
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log('jwtdata', data);
        if (!data) {
            return res.status(401).json({ success: false, msg: "Unauthorized access" })
        }
        const user = await userModel.findOne({ id: data.id });
        // const user = await get_user_by_id(req, data.id)
        if (!user) {
            return res.status(401).json({ success: false, msg: "Unauthorized access" })
        }
        req.user = user
        next()
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}

module.exports = authenticate