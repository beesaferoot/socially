const repo = require("../repository/post");

async function isPostOwner(req, res, next) {
  const { id } = req.params;
  const post = await repo.getById(id);

  if (!post) {
    res.status(400).send({ error: "Invalid post id." });
    return;
  }
  if (
    req.session.user.role !== "superadmin" &&
    req.session.user.id !== post.userId
  ) {
    res.status(401).send({ error: "Only post owner can delete a post." });
    return;
  }
  next();
}

module.exports = { isPostOwner };
