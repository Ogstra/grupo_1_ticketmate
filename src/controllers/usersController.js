const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const { Op } = require("sequelize");


// ******** Modelos viejos ******** 
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const usersModel = require('../models/usersModels');
const { validationResult } = require('express-validator');
let isLoggedIn = false

const controller = {
	loginForm: (req, res) => {
		res.render('login');
	},
	login: async (req, res) => {
		const username = req.body.username;
		let comparePasswords = false // password authentication flag
	  
		if (req.body["mant-ses-ini"] === 'on') {
		  req.session.cookie.maxAge = 604800000 /* 7 days */
		} 
	  
		try {
		  const userDb = await db.User.findOne({
			where: {[Op.or]: [{email: username}, {username: username}]},
			raw: true,
		  });
	  
		  if (userDb) { comparePasswords = bcrypt.compareSync(req.body.password, userDb.password) };

		  if (comparePasswords === true) {
			  req.session.userLogged = userDb
			  
			res.redirect('/');
		  } else {
			res.redirect("./login")
		  }
	  
		} catch (error) {
		  res.send(error)
		}
	},
	registerForm: (req, res) => {
		const errors = req.query;
		res.render('register', { errors: errors });
	},
	register: async (req, res) => {
		let validation = validationResult(req);
		let profilePicture = 'default-profile-picture.jpg';

		if (validation.errors.length > 0) {
			const errorArray = validation.errors.map(error => '&' + error.path + 'Error' + '=' + error.msg);
			let errorString = errorArray.join('');
			const oldDataArray = Object.entries(req.body).map(bodyData => '&' + 'old' + bodyData[0] + '=' + bodyData[1]);
			const oldDataString = oldDataArray.join('');
			res.redirect('/register' + '?' + errorString + oldDataString);
			return;
		}

		try {
			let userInDB = await db.User.findOne({
				where: {[Op.or]: [{email: req.body.email}, {username: req.body.username}]},
				raw:true
			});
			console.log(userInDB)
			if (userInDB) {
				res.redirect('/register' + '?' + '&DBError' + '=' + 'Este usuario ya se encuentra registrado');
				return;
			}
		} catch (error) {
			res.send('Algo salio mal 1')
		}

		if (req.file) {
			profilePicture = req.file.filename;
		}

		const newUser = {
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			image: profilePicture,
			password: bcrypt.hashSync(req.body.password, 10),
		};

		try {
			await db.User.create(newUser);
			res.redirect('/');
		} catch (error) {
			res.send('Algo salio mal 2');
		}

	}
}
module.exports = controller;