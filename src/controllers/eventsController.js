const fs = require('fs');
const path = require('path');
const eventsFilePath = path.join(__dirname, '../data/eventsDataBase.json');
const events = JSON.parse(fs.readFileSync(eventsFilePath, 'utf-8'));
const eventsModel = require('../models/eventsModels');
const db = require("../database/models");
const { validationResult } = require('express-validator');
const { log } = require('console');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all events
	index: async (req, res) => {
		const events = await db.Event.findAll({include: ["category"]});
		const userLogged = req.session.userLogged
		res.render("events.ejs", { events , userLogged: userLogged } )
	},

	// Detail - Detail from one event
	detail: async (req, res) => {
		const eventId = req.params.id;
		const selectedEvent = await db.Event.findByPk(eventId, {include: ["category"]});
		res.render('detail', { event: selectedEvent });
	},

	// Create - Form to create
	create: async (req, res) => {
		const errors = req.query;
		const categories = await db.Category.findAll({raw: true});
		res.render('event-creation-form', { errors: errors,
		categories }); //hacer llegar de alguna manera los datos del error anterior
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
		console.log(req.body);
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
	edit: (req, res) => {
		let currentEvent = eventsModel.findbyID(req.params.id);
		currentEvent.date = eventsModel.handleDate(currentEvent.date);
		res.render('event-edit-form', { currentEvent: currentEvent });
	},

	// Metodo de edicion de eventos
	update: (req, res) => {
		let events = eventsModel.findAll();
		let eventID = events.findIndex(event => event.id == req.params.id);

		//agregar validaciones y manejo de errores

		let updatedEvent = {
			id: Number(req.params.id), /* Sin el Number() el id se guarda como string */
			name: req.body.name,
			price: req.body.price,
			stock: req.body.stock,
			date: eventsModel.handleDate(req.body.date),
			category: req.body.category,
			image: req.file ? req.file.filename : events[eventID].image,
			time: req.body.time,
			description: req.body.description
		};

		eventsModel.editEvent(updatedEvent);

		res.redirect('/events/' + updatedEvent.id);
	},

	// Delete - Delete one event from DB
	destroy: async (req, res) => {
		const selectedEvent = await db.Event.destroy({where: { id: req.params.id }});
		res.redirect('/');
	}
};

module.exports = controller;