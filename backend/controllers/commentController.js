const Comment = require("../models/comment");

exports.comment_get_by_post = async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postid })
    .populate("user")
    .sort({
      created: 1,
    });
  res.json(comments);
};

exports.comment_create = async (req, res, next) => {
  const commentDetail = {
    content: req.body.content,
    post: req.params.postid,
    user: req.user,
  };

  const comment = new Comment(commentDetail);
  await comment.save();

  res.send(comment.id);
};

exports.comment_delete = async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.id);

  res.sendStatus(202);
};
