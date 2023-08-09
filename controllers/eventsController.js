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

        const selectedevent = events.filter( idevent => idevent.id === eventId);

        res.render('detail', { event: selectedevent });
	},

	// Create - Form to create
	create: (req, res) => {
        res.render('event-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		eventsModel.createEvent(req.body);

		res.redirect("/");
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one event from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;