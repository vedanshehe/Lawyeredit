import Post from "../models/postmodel.js";

// create post logic
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({
      title,
      content,
      author
    });

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL POSTS 
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE POST (public)
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};
