const ganarateCaption  = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const postModel = require("../models/post.model");
const { v4: uuidv4 } = require('uuid');

async function createPostController(req,res){
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const base64ImageFile = new Buffer.from(file.buffer).toString("base64");
    try {
        const caption = await ganarateCaption(base64ImageFile);
        const result = await uploadFile(file.buffer, `${uuidv4()}`);
        const post = await postModel.create({
            caption: caption,
            image: result.url,
            user: req.user._id
        })
        return res.status(200).json({ message:"post created successfully", post,caption });
    } catch (error) {
        console.error("Error generating caption:", error);
        return res.status(500).json({ error: "Failed to generate caption" });
    }
}

module.exports = {
    createPostController
}
