const express = require("express");

const router = express.Router();

const postRoute = require("../controllers/post");
const profileRoute = require("../controllers/profile");
const userRoute = require("../controllers/user");
const authRoute = require("../controllers/auth");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/profile", profileRoute);
router.use("/post", postRoute);
module.exports = router;
