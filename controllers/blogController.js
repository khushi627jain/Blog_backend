const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.filename;

    const newBlog = await Blog.create({
      title,
      description,
      image,
      createdBy: req.user,
    });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: 'error' });
  }
};

exports.getBlogs = async (req, res) => {
  const allBlogs = await Blog.find().populate('createdBy', 'email');
  res.json(allBlogs);
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image = req.file?.filename;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      title,
      description,
      ...(image && { image }), ///images is preesent then only inserting
    },
    { new: true }
  );

  res.json(updatedBlog);
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: 'blog deleted' });
};

exports.getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};
