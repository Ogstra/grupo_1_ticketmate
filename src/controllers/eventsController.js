const fs = require('fs');
const path = require('path');
const eventsFilePath = path.join(__dirname, '../data/eventsDataBase.json');
const events = JSON.parse(fs.readFileSync(eventsFilePath, 'utf-8'));
const eventsModel = require('../models/eventsModels');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all events
	index: (req, res) => {
		res.render(path.resolve(__dirname, "../views/events.ejs"))
	},

	// Detail - Detail from one event
	detail: (req, res) => {
		const eventId = req.params.id;

		const selectedevent = events.filter(idevent => idevent.id === eventId);

		res.render('detail', { event: selectedevent });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('event-creation-form');
	},

	// Create -  Method to store
	store: (req, res) => {
		console.table(req.file);
		let eventImage;

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
			category: req.body.category,
			image: eventImage,
			time: req.body.time,
			description: req.body.description
		};

		const createdEvent = eventsModel.createEvent(newEvent);

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
		let eventImage;
		let eventID = events.findIndex(event => event.id == req.params.id);


		if (!req.file) {
			eventImage = events[eventID].image;
		} else {
			eventImage = req.file.filename;
		}

		let updatedEvent = {
			id: req.params.id,
			name: req.body.name,
			price: req.body.price,
			stock: req.body.stock,
			date: eventsModel.handleDate(req.body.date),
			category: req.body.category,
			image: eventImage,
			time: req.body.time,
			description: req.body.description
		};

		eventsModel.editEvent(updatedEvent);

		res.redirect('/'); //deberia llevar al detail
	},

	// Delete - Delete one event from DB
	destroy: (req, res) => {
		let events = eventsModel.findAll();
		events = events.filter(event => event.id != req.params.id);
		console.log(events)
		eventsModel.deleteEvent(events);
		res.redirect('/');
	}
};

module.exports = controller;