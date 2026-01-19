import Reply from "../models/replymodel.js";

export const createReply = async (req, res, next) => {
  try {
    const { title, body } = req.body;
const author = req.user._id;


    if (!content || !author || !post) {
      return res.status(400).json({
        message: "content, author and post are required"
      });
    }

    const reply = await Reply.create({
      content,
      author,
      post,
      parentReply: parentReply || null
    });

    res.status(201).json({
      success: true,
      data: reply
    });
  } catch (error) {
    next(error);
  }
};

//get replies for a post
export const getRepliesForPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const replies = await Reply.find({ post: postId })
      .populate("author", "username email")
      .sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      data: replies
    });
  } catch (error) {
    next(error);
  }
};
