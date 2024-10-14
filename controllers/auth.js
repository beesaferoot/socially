const express = require("express");
const router = express.Router();

const repo = require("../repository/user");
const { verifyHashedPassword } = require("../util/auth");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await repo.getByUserName(username);
  if (user === null) {
    return res.status(401).send({ error: "Username/password incorrect." });
  }

  if (!(await verifyHashedPassword({ password, hash: user.password }))) {
    return res.status(401).send({ error: "Username/password incorrect." });
  }

  req.session.user = user;
  res.status(200).send({ msg: "Login successful." });
  return;
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ error: "Error logging out." });
    }
    res.clearCookie("connect.sid");
    res.status(200).send({ msg: "Logout successful." });
  });
});

module.exports = router;
