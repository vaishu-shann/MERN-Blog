const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { createBlog, getBlog, getBlogById, editBlog, uploadImage } = require("../controllers/postController");
const router = express.Router();

// router.use(validateToken)

router.route("/").post(createBlog).get(getBlog).put(editBlog)
router.route("/upload").post(uploadImage)
router.route("/:id").get(getBlogById)
 
module.exports = router;