const buildReplyTree = (replies) => {
  const map = {};
  const roots = [];

  replies.forEach(reply => {
    map[reply._id] = { ...reply._doc, children: [] };
  });

  replies.forEach(reply => {
    if (reply.parentReply) {
      map[reply.parentReply]?.children.push(map[reply._id]);
    } else {
      roots.push(map[reply._id]);
    }
  });

  return roots;
};

export default buildReplyTree;
