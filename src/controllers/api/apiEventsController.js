const fs = require('fs');
const path = require('path');
const db = require("../../database/models");
const { validationResult } = require('express-validator');
const moment = require('moment');
const {Op} = require('sequelize');

const controller = {
    // Root - Show all events
    getEvents: async (req, res) => {
        const events = await db.Event.findAll({
            include: ["category"],
            nested: true,
            order: [["date", "ASC"]],
        });
        res.json(events);
    },

    getCategories: async (req, res) => {
        const categories = await db.Category.findAll();
        res.json(categories);
    },

    getVenues: async (req, res) => {
        const venues = await db.Venue.findAll();
        res.json(venues);
    },

    // Detail - Detail from one event
    getDetail: async (req, res) => {
        const eventId = req.params.id;
        const selectedEvent = await db.Event.findByPk(eventId, {
            include: ["category", "venue"],
        });
        res.json(selectedEvent);
    },

    // Delete - Delete one event from DB
    destroy: async (req, res) => {
        try {   
            const selectedEvent = await db.Event.destroy({ where: { id: req.params.id } });
            res.json("Evento eliminado")
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    getEventByName: async (req,res) => {
        try {
            const result = await db.Event.findAll(
                {where: {name: {[Op.like]: '%'+req.params.search+'%'} } }
            )
            res.json(result)
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    }
};

module.exports = controller;