const Post = require("../models/post");

exports.post_get_all = async (req, res, next) => {
  const posts = await Post.find({}).sort({ updated: 1 }).populate("user");
  res.json(posts);
};

exports.post_create = async (req, res, next) => {
  const postDetail = {
    ...req.body,
    user: req.user,
  };
  const post = new Post(postDetail);
  await post.save();
  res.send(post.id);
};

exports.post_delete = async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);

  res.sendStatus(202);
};

exports.post_update = async (req, res, next) => {
  const postDetail = {
    title: req.body.title,
    content: req.body.content,
    update: Date.now(),
  };

  await Post.findByIdAndUpdate(req.params.id, postDetail);

  res.sendStatus(202);
};
