const db = require("../database/models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

module.exports = async function userAuth(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect('/')
  }
  next();
};
