const UserModel = require("../models/user");
const ProfileRepo = require("../repository/profile");
const util = require("../util/auth");
const dbUtil = require("../util/db");

class UserRepo {
  static async create({ username, email, password }) {
    const hashedPassword = await util.hashPassword(password);
    const user = new UserModel({
      username,
      email,
      emailVerified: false,
      tempPassword: util.genTempPassword(6),
      password: hashedPassword,
    });
    user.save();
    return user;
  }
  static async getById({ userId }) {
    return await UserModel.findById(userId);
  }

  static async getByUserName(username) {
    return await UserModel.findOne({ username: username });
  }

  static async delete({ userId }) {
    const db = dbUtil.getDB();
    let isSuccess = true;
    try {
      await db.transaction(async (session) => {
        await ProfileRepo.setDeletedUser();
        await UserModel.deleteOne({ _id: userId });
      });
    } catch (err) {
      isSuccess = false;
      console.error(err);
    }

    return isSuccess;
  }
}

module.exports = UserRepo;
