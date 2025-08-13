const express = require("express");
const { registerController, loginController } = require("../controllers/auth.controller");
const { createPostController } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
    // limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    }
})

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/current-user", authMiddleware, (req, res) => {
    res.json({user : req.user});
});

router.post("/create", authMiddleware, upload.single("image") , createPostController);

module.exports = router;
