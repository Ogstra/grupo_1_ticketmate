const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
const bcrypt = require("bcrypt");
const db = require("../database/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const secretKey = 'BX50dHm/5UXyeS57Zi3WZjOq0TCPBUQ2';

// ******** Modelos viejos ********
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const usersModel = require("../models/usersModels");

const { validationResult } = require("express-validator");

const controller = {
	loginForm: (req, res) => {
		res.render("login");
	},
	login: async (req, res) => {
		const username = req.body.username;
		let comparePasswords = false; // password authentication flag

		try {
			const userDb = await db.User.findOne({
				where: { [Op.or]: [{ email: username }, { username: username }] },
				raw: true,
			});

			if (userDb) {
				comparePasswords = bcrypt.compareSync(
					req.body.password,
					userDb.password
				);
			}

			if (comparePasswords === true) {
				req.session.userLogged = {
					uuid: userDb.uuid,
					username: userDb.username,
					email: userDb.email,
					first_name: userDb.first_name,
					last_name: userDb.last_name,
					image: userDb.image,
					admin: userDb.admin
				}

				if (req.body["mant-ses-ini"] === "on") {
					let token = jwt.sign({ ...req.session.userLogged }, secretKey, { expiresIn: '365d' });
					res.cookie("auth", { token }, {
						httpOnly: true,
						sameSite: true,
						maxAge: 365 * 24 * 3600 * 1000 // 1 year
					});
				}
				res.redirect("/");

			} else {
				res.redirect("./login");
			}
		} catch (error) {
			res.send(error);
		}
	},

	logout: (req, res) => {
		res.clearCookie("auth");
		req.session.destroy();
		res.redirect('/');
	},

	registerForm: (req, res) => {
		const errors = req.query;
		res.render("register", { errors: errors });
	},
	register: async (req, res) => {
		let validation = validationResult(req);
		let profilePicture = "default-profile-picture.jpg";

		if (validation.errors.length > 0) {
			const errorArray = validation.errors.map(
				(error) => "&" + error.path + "Error" + "=" + error.msg
			);
			let errorString = errorArray.join("");
			const oldDataArray = Object.entries(req.body).map(
				(bodyData) => "&" + "old" + bodyData[0] + "=" + bodyData[1]
			);
			const oldDataString = oldDataArray.join("");
			res.redirect("/register" + "?" + errorString + oldDataString);
			return;
		}

		try {
			let userInDB = await db.User.findOne({
				where: {
					[Op.or]: [{ email: req.body.email }, { username: req.body.username }],
				},
				raw: true,
			});
			if (userInDB) {
				res.redirect(
					"/register" +
					"?" +
					"&DBError" +
					"=" +
					"Este usuario ya se encuentra registrado"
				);
				return;
			}
		} catch (error) {
			res.send("Algo salio mal 1");
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
			res.redirect("/");
		} catch (error) {
			res.send("Algo salio mal 2");
		}
	},

	profile: async (req, res) => {
		try {
			const userLogged = req.session.userLogged
			const user = await db.User.findByPk(req.params.uuid);
			res.render("profile", { user, userLogged });
		} catch (error) {
			console.log(error);
		}
	},

	userList: async (req, res) => {
		try {
			const users = await db.User.findAll({
				order: [
					["admin", "DESC"],
					["created_at", "DESC"]
				]
		});
			const userLogged = req.session.userLogged;
			res.render('userList', { users, userLogged });
		} catch (error) {
			console.log(error);
		}
	}
};
module.exports = controller;
