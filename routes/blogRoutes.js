const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const { validate } = require("express-validation");
const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} = require("../controllers/blogController");

const {
  createBlog: createBlogValidation,
  updateBlog: updateBlogValidation,
} = require("../validations/blogValidation");
const validateObjectId = require("../middlewares/validateObjectId");

router.post("/", auth, upload.single("image"), validate(createBlogValidation), createBlog);
router.get("/", getBlogs);
router.get("/:id", validateObjectId, getSingleBlog);
router.put("/:id", auth, validateObjectId, upload.single("image"), validate(updateBlogValidation), updateBlog);
router.delete("/:id", auth, validateObjectId, deleteBlog);

module.exports = router;
