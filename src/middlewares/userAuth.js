const db = require("../database/models");
const bcrypt = require('bcrypt');

module.exports = function userAuth(req, res, next) {
    const username = req.username;
    const password = bcrypt.hashSync(req.body.password, 10);
    const rememberMe = req.body['mant-ses-ini']; // 'on'/undefined
    const auth = req.body;
    const userDb = async () => {
      try {
        const user = await db.User.findOne({ where: { username: username} })
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }


    if (auth) {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
}