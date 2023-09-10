const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const usersModel = require('../models/usersModels');
const bcrypt = require('bcrypt');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
	register: (req, res) => {
		let profilePicture;

		if (!req.file) {
			profilePicture = 'default-profile-picture.jpg';
		} else {
			profilePicture = req.file.filename;
		}
		const newUser = {
			username: req.body.username,
			email: req.body.email,
			name: req.body.name,
			image: profilePicture,
			password: bcrypt.hashSync(req.body.password, 10),
		};

		const createdUser = usersModel.createUser(newUser);

		res.redirect('/');
	}
}
module.exports = controller;