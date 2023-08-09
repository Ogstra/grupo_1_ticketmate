const { log } = require('console');
const fs = require('fs');
const path = require('path');
const { createEvent } = require('../models/eventsModels');

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
        res.render('event-creation-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		/* console.log("req body desde el controlador",req.body); */
		eventsModel.createEvent(req.body);

		const newEvent = {
            name: req.body.name,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            date: req.body.date,
            category: req.body.category,
            time: req.body.time,
            description: req.body.description  
        };

		const createdEvent = eventsModel.createEvent(newEvent);

		res.redirect("/events/" + createdEvent.id);
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