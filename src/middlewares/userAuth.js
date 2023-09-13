const db = require("../database/models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

module.exports = async function userAuth(req, res, next) {
  const username = req.body.username;
  let rememberMe = req.body["mant-ses-ini"]; // 'on'/undefined
  let comparePasswords = false // password authentication flag

  if (rememberMe === 'on') {
    rememberMe = 604800000 /* 7 days */
  } else rememberMe = null

  try {
    const userDb = await db.User.findOne({
      where: {[Op.or]: [{email: username}, {username: username}]},
      raw: true,
    });

    if (userDb) { comparePasswords = bcrypt.compareSync(req.body.password, userDb.password) };

    if (comparePasswords === true) {
      res.cookie('userKey', (req.session.cookie.sessionId), {maxAge: rememberMe});

      next();
    } else {
      res.redirect("./login")
    }

  } catch (error) {
    res.send(error)
  }
};
