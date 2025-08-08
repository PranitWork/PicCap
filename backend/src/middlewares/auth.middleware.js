const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model")


async function authMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error: "Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        req.user = user;
        next();
    }catch(err){
        return res.status(401).json({error: "Invalid token"});
    }
}

module.exports = authMiddleware;