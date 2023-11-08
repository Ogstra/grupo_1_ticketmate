const fs = require('fs');
const path = require('path');
const eventsFilePath = path.join(__dirname, '../data/eventsDataBase.json');
const events = JSON.parse(fs.readFileSync(eventsFilePath, 'utf-8'));
const eventsModel = require('../models/eventsModels'); //model viejo
const db = require("../database/models");
const { validationResult } = require('express-validator');
const moment = require('moment');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all events
	index: async (req, res) => {
		const events = await db.Event.findAll({
			include: ["category"],
			order: [["date", "ASC"]]
			},
	 );
		const userLogged = req.session.userLogged
		res.render("events.ejs", { moment: moment, events, userLogged: userLogged })
	},

	// Detail - Detail from one event
	detail: async (req, res) => {
		const eventId = req.params.id;
		const userLogged = req.session.userLogged
		const selectedEvent = await db.Event.findByPk(eventId, { include: ["category"] });
		res.render('detail', { userLogged, event: selectedEvent });
	},

	// Create - Form to create
	create: async (req, res) => {
		const errors = req.query;
		const categories = await db.Category.findAll({ raw: true });
		res.render('event-creation-form', {
			errors: errors,
			categories
		}); //hacer llegar de alguna manera los datos del error anterior
	},

	// Create -  Method to store
	store: async (req, res) => {
		let result = validationResult(req);
		let eventImage;

		if (result.errors.length > 0) {
			const errorArray = result.errors.map(error => '&' + error.path + 'Error=' + error.msg);
			const errorString = errorArray.join('');
			const oldDataArray = Object.entries(req.body).map(bodydata => '&old' + bodydata[0] + '=' + bodydata[1]);
			const oldDataString = oldDataArray.join('');
			res.redirect('/events/create?' + errorString + oldDataString);
			return;
		}

		if (!req.file) {
			eventImage = 'placeholder.jpg';
		} else {
			eventImage = req.file.filename;
		}
		
		const newEvent = {
			name: req.body.name,
			price: req.body.price,
			stock: req.body.stock,
			date: req.body.date,
			category_id: req.body.category,
			image: eventImage,
			time: req.body.time,
			description: req.body.description
		};

		const createdEvent = await db.Event.create(newEvent);
		res.redirect("/events/" + createdEvent.id);
	},

	// Muestra el formulario de edicion
	edit: async (req, res) => {
		try {
			const eventId = req.params.id;
			const categories = await db.Category.findAll({ raw: true });
			const currentEvent = await db.Event.findByPk(eventId, { include: ["category"] });
			res.render('event-edit-form', { currentEvent: currentEvent, categories: categories });
		} catch (error) {
			console.log(error)
		}
	},

	// Metodo de edicion de eventos
	update: async (req, res) => {
		let eventID = req.params.id
		let eventImage

		if(!req.file){
			try {
				eventImage = (await db.Event.findByPk(eventID)).image
				console.log("AYODAME LOCO",eventImage)
			} catch (error) {
				console.log(error);
			}
		}else{
			eventImage = req.file.filename
			console.log("AYODAME LOCO2",eventImage)
		}

		let updatedEvent = {
			name: req.body.name,
			price: req.body.price,
			stock: req.body.stock,
			date: req.body.date,
			time: req.body.time,
			category: req.body.category,
			image: eventImage,
			description: req.body.description
		};

		console.log(updatedEvent)

		try {
			await db.Event.update(updatedEvent, {where:{id:eventID}})
			res.redirect('/events/' + eventID);
		} catch (error) {
			console.log(error)
		}
	},

	// Delete - Delete one event from DB
	destroy: async (req, res) => {
		const selectedEvent = await db.Event.destroy({ where: { id: req.params.id } });
		res.redirect('/');
	},

};

module.exports = controller;