const { PostSchema, CommentSchema } = require("../models/post");
const { getDB } = require("../util/db");

class PostRepo {
  static async create({ userId, content, mediaUrls }) {
    const post = new PostSchema({
      userId,
      content,
      mediaUrls,
      likes: [],
    });
    post.save();
    return post;
  }

  static async getById(id) {
    return await PostSchema.findById(id);
  }

  static async getByUserId(userId) {
    return await PostSchema.find({ userId });
  }

  static async delete(postId) {
    const db = await getDB();
    let isSuccess = true;
    try {
      await db.transaction(async (session) => {
        await PostSchema.deleteOne({ _id: postId });
        await CommentSchema.updateMany(
          { postId },
          { $set: { isPostDeleted: true } }
        );
      });
    } catch (err) {
      isSuccess = false;
      console.error(err);
    }
    return isSuccess;
  }

  static async comment({ postId, userId, content }) {
    const comment = new CommentSchema({
      postId,
      userId,
      content,
    });
    comment.save();
    return comment;
  }

  static async deleteComment(commentId) {
    return await CommentSchema.deleteOne({ _id: commentId });
  }

  static async like({ userId, postId }) {
    return await PostSchema.findOneAndUpdate(
      { _id: postId },
      { $push: { likes: userId }, $inc: { NumberOfLikes: 1 } }
    );
  }

  static async unlike({ userId, postId }) {
    return await PostSchema.findOneAndUpdate(
      { _id: postId },
      { $pull: { likes: userId }, $inc: { NumberOfLikes: -1 } }
    );
  }
}

module.exports = PostRepo;
