const jwt = require("jsonwebtoken");
const secretKey = 'BX50dHm/5UXyeS57Zi3WZjOq0TCPBUQ2';

module.exports = async function userAuth(req, res, next) {
  const jwtCookie = req.cookies.auth

  if (jwtCookie) {

    try {
      const decoded = jwt.verify(jwtCookie.token, secretKey);
      req.session.userLogged = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  }

  if (req.session.userLogged) {
    return res.redirect('/')
  }

  next();
};