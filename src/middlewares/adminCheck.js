module.exports = async function adminCheck(req, res, next) {
  if (req.session.userLogged.admin === 1) {
    next();
  } else res.send('Necesitas estas autorizado')
}

