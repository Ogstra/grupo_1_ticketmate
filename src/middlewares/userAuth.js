const db = require("../database/models");
const bcrypt = require("bcrypt");

module.exports = async function userAuth(req, res, next) {
  const username = req.body.username;
  const rememberMe = req.body["mant-ses-ini"]; // 'on'/undefined
  let comparePasswords = false // password autentication flag

  try {
    const userDb = await db.User.findOne({
      where: { username: username },
      raw: true,
    });
    console.log(userDb);
     
    if (userDb) {comparePasswords = bcrypt.compareSync(req.body.password, userDb.password)};

    if (comparePasswords === true) {
      next();
    } else {
      res.redirect("./login")
    }

  } catch (error) {
    console.log(error);
  }
};
