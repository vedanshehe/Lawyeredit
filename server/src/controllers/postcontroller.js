import Post from "../models/postmodel.js";
import checkOwnership from "../utils/ownership.js";

// create post logic
export const createPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const author = req.user._id;

    if (!title || !body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({
      title,
      body,
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

// get all the posts 
export const getPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      page,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

// for gettig single posts
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

//delete a post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const err = new Error("Post not found");
      err.statusCode = 404;
      throw err;
    }

    if (!checkOwnership(post.author, req.user._id)) {
      const err = new Error("Not authorized");
      err.statusCode = 403;
      throw err;
    }

    await post.deleteOne();

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};