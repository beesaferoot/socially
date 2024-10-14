const ProfileModel = require("../models/profile");
const { getDB } = require("../util/db");

class ProfileRepo {
  static async create({ userId, bio = "", dob, imageUrl = "", livesAt = "" }) {
    const profile = new ProfileModel({
      userId,
      bio,
      dob,
      imageUrl,
      livesAt,
      followers: [],
      following: [],
    });
    profile.save();
    return profile;
  }
  static async getById({ pId }) {
    return await ProfileModel.findById(pId);
  }

  static async getByUserid({ userId }) {
    return await ProfileModel.findOne({ userId: userId });
  }

  static async followByUser({ pId, userId }) {
    const db = await getDB();
    let isSuccess = true;
    try {
      await db.transaction(async (session) => {
        const profile = await ProfileModel.findOneAndUpdate(
          { _id: pId },
          { $push: { following: userId } }
        );
        await ProfileModel.updateOne(
          { userId: userId },
          { $push: { followers: profile.userId } }
        );
      });
    } catch (err) {
      isSuccess = false;
      console.log(err);
    }

    return isSuccess;
  }
  static async unfollowByUser({ pId, userId }) {
    const db = await getDB();
    let isSuccess = true;
    try {
      await db.transaction(async (session) => {
        const profile = await ProfileModel.findOneAndUpdate(
          { _id: pId },
          { $pull: { following: userId } }
        );
        await ProfileModel.updateOne(
          { userId: userId },
          { $pull: { followers: profile.userId } }
        );
      });
    } catch (err) {
      isSuccess = false;
      console.error(err);
    }

    return isSuccess;
  }
  static async updateProfile({
    pId,
    bio = "",
    imageUrl = "",
    dob = "",
    livesAt = "",
  }) {
    const updateFields = {};

    if (bio) {
      updateFields.bio = bio;
    }
    if (imageUrl) {
      updateFields.imageUrl = imageUrl;
    }
    if (dob) {
      updateFields.dob = dob;
    }

    if (livesAt) {
      updateFields.livesAt = livesAt;
    }

    // If there are no fields to update, return early
    if (Object.keys(updateFields).length === 0) {
      throw new Error("No valid fields to update.");
    }

    // Update the lastEditedAt field to the current date/time
    updateFields.lastEditedAt = new Date();

    // Find the profile by userId and update the provided fields
    const updatedProfile = await this.findOneAndUpdate(
      { _id: pId },
      { $set: updateFields },
      { new: true }
    );

    return updatedProfile;
  }
}

module.exports = ProfileRepo;
