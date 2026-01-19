import mongoose from 'mongoose';

const replySchema =new mongoose.Schema({
    replytext:{
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 500
    },
    author:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    parentReply:{
        type: mongoose.Schema.ObjectId,
        ref: 'Reply'
},
}, {timestamps:true});

const Reply = mongoose.model("Reply", replySchema);
export default Reply;