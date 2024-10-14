const express = require("express");
const router = express.Router();

const authMiddleWare = require("../middleware/auth");

const repo = require("../repository/user");
const { validateData } = require("../middleware/validator");
const { userCreateSchema } = require("../schemas/user");

router.get(
  "/:id",
  authMiddleWare.userShouldbeAuthenticated,
  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await repo.getById({ userId: id });
      if (user) {
        res.status(200).send(user);
        return;
      }
      res.status(404).send({ error: "User not found." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ error: "Error occured trying to retrieve user details." });
    }
  }
);

router.post("/", validateData(userCreateSchema), async (req, res) => {
  const { username, email, password } = req.body;

  // if (!username) {
  //   return res
  //     .status(400)
  //     .send({ error: "Invalid request missing username field." });
  // }
  // if (!email) {
  //   return res
  //     .status(400)
  //     .send({ error: "Invalid request missing email field." });
  // }
  // if (!password) {
  //   return res
  //     .status(400)
  //     .send({ error: "Invalid request missing password field." });
  // }
  try {
    user = await repo.create({ username, email, password });
    if (user) {
      return res.status(201).send(user);
    }
    return res.status(500).send({ error: "Failed to create user." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error occured creating user." });
  }
});

router.post(
  "/delete/:id",
  authMiddleWare.userShouldbeAuthenticated,
  async (req, res) => {
    const { id } = req.params;

    try {
      const success = await repo.delete({ userId: id });
      if (success) {
        return res.status(200).send({ error: "Successfully deleted user." });
      }
      return res.status(500).send({ error: "Failed to delete user." });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Error occured deleting user." });
    }
  }
);

module.exports = router;
