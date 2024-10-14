const express = require("express");
const router = express.Router();

const { isPostOwner } = require("../middleware/post");
const authMiddleWare = require("../middleware/auth");
router.use(authMiddleWare.userShouldbeAuthenticated);

const repo = require("../repository/post");
const { validateData } = require("../middleware/validator");
const { postCreateSchema, commentCreateSchema } = require("../schemas/post");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await repo.getById(id);
    if (post) {
      return res.status(200).send(post);
    }
    return res.status(500).send({ error: "Failed to retrived post." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured retriving post." });
  }
});

router.post("/", validateData(postCreateSchema), async (req, res) => {
  const { userId, content, mediaUrls } = req.body;
  try {
    const post = await repo.create({ userId, content, mediaUrls });
    if (post) {
      return res.status(201).send(post);
    }
    return res.status(500).send({ error: "Failed to create post." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured creating post." });
  }
});

router.delete("/:id", isPostOwner, async (req, res) => {
  const { id } = req.params;
  try {
    const isSuccess = await repo.delete(id);
    if (isSuccess) {
      return res
        .status(200)
        .send({ msg: `Successfully deleted post with id ${id}.` });
    }
    return res.status(500).send({ error: "Failed to delete post." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured deleting post." });
  }
});

router.post("/:id/like", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await repo.like({ userId, postId: id });
    if (post) {
      return res.status(200).send(post);
    }
    return res.status(500).send({ error: "Failed to update post." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured updating post." });
  }
});

router.post("/:id/unlike", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await repo.unlike({ userId, postId: id });
    if (post) {
      return res.status(200).send(post);
    }
    return res.status(500).send({ error: "Failed to update post." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured updating post." });
  }
});

router.post(
  "/:id/comment",
  validateData(commentCreateSchema),
  async (req, res) => {
    const { id } = req.params;
    const { userId, content } = req.body;

    try {
      const comment = await repo.comment({ postId: id, userId, content });
      if (comment) {
        return res.status(201).send(comment);
      }
      return res.status(500).send({ error: "Failed to comment on post." });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send({ error: "Error occured commenting on post." });
    }
  }
);

module.exports = router;
