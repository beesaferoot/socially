function userShouldbeAuthenticated(req, res, next) {
  if (!req.session.user) {
    res
      .status(401)
      .send({ error: "Unauthorized access to resource at this location." });
    return;
  }
  next();
}

module.exports = { userShouldbeAuthenticated };
