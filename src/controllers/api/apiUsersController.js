const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("../../database/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const secretKey = 'BX50dHm/5UXyeS57Zi3WZjOq0TCPBUQ2';

const controller = {
    profile: async (req, res) => {
		try {
			const user = await db.User.findByPk(req.params.uuid);
			res.json(user);
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
			res.json(users);
		} catch (error) {
			console.log(error);
		}
	},

    adminUsers: async (req, res) => {
		try {
			const users = await db.User.findAll({
                where: { admin: 1},
				order: [["created_at", "DESC"]]
		});
			res.json(users);
		} catch (error) {
			console.log(error);
		}
	},
};
module.exports = controller;
