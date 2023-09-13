module.exports = async function userAuth(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect('/')
  }
  next();
};
