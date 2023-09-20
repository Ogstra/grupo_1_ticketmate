module.exports = async function loginNeeded(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect("/");
  }
  next();
};
