const express = require("express");
const router = express.Router();

const authMiddleWare = require("../middleware/auth");

router.use(authMiddleWare.userShouldbeAuthenticated);

const repo = require("../repository/profile");
const { validateData } = require("../middleware/validator");
const {
  profileCreateSchema,
  profileUpdateSchema,
} = require("../schemas/profile");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await repo.getById({ pId: id });
    if (profile) {
      return res.status(200).send(profile);
    }
    return res.status(500).send({ error: "Failed to retrieve profile." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured retrieving profile." });
  }
});

router.get("/of/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await repo.getByUserid({ userId: userId });
    if (profile) {
      return res.status(200).send(profile);
    }
    return res.status(500).send({ error: "Failed to retrive profile." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured retrieving profile." });
  }
});

router.patch("/:id", validateData(profileUpdateSchema), async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProfile = await repo.updateProfile({ pid: id, ...req.body });
    if (updatedProfile) {
      return res.status(200).send(updatedProfile);
    }
    return res.status(500).send({ error: "Failed to update profile." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured updating profile." });
  }
});

router.post("/", validateData(profileCreateSchema), async (req, res) => {
  const { userId, bio, dob, imageUrl, livesAt } = req.body;

  try {
    const profile = await repo.create({ userId, bio, dob, imageUrl, livesAt });
    if (profile) {
      return res.status(201).send(profile);
    }
    return res.status(500).send({ error: "Failed to create profile." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured creating profile." });
  }
});

router.post("/follow/:id/:userId", async (req, res) => {
  const { id, userId } = req.params;
  try {
    const success = await repo.followByUser({ pId: id, userId });
    if (success) {
      return res
        .status(200)
        .send({ msg: `Successfully followed user ${userId}.` });
    }
    return res.status(500).send({ error: "Failed to follow user" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured following user" });
  }
});

router.post("/unfollow/:id/:userId", async (req, res) => {
  const { id, userId } = req.params;
  try {
    const success = await repo.unfollowByUser({ pId: id, userId });
    if (success) {
      return res
        .status(200)
        .send({ msg: `Successfully unfollowed user ${userId}.` });
    }
    return res.status(500).send({ error: "Failed to unfollow user" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured unfollowing user" });
  }
});

module.exports = router;
