const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const bcrypt = require('bcrypt');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');


// ******** Modelos viejos ******** 
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const usersModel = require('../models/usersModels');


const controller = {
	loginForm: (req, res) => {
		res.render('login');
	},
	login: (req, res) => {
		res.redirect('/');
	},
	registerForm: (req, res) => {
		res.render('register');
	},
	register: async (req, res) => {
		let profilePicture = 'default-profile-picture.jpg';

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

		console.log(newUser);

		/* const createdUser = usersModel.createUser(newUser); */

		try {
			await db.User.create(newUser);
			res.redirect('/');
		} catch (error) {
			res.send(error);
		}

	}
}
module.exports = controller;