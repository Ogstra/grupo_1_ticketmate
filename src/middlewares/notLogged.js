module.exports = async function notLogged(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect("/");
  }
  next();
};
