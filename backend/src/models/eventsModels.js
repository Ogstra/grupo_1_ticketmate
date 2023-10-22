const { log } = require('console');
const fs = require('fs');
const path = require('path');
const eventsPath = path.join(__dirname, '../data/eventsDataBase.json');

const modelo = {
    //lee de un JSON todos los eventos y los devuelve en un array de JS
    findAll: () => {
        const result = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));
        return result;
    },
    //busca un evento en particular en base a su ID
    findbyID: (id) => {
        let events = modelo.findAll();
        return (events.find(event => event.id == id));
    },
    //recibe una fecha en formato US y lo traduce a formato normal
    handleDate: (date) => {
        let dateArray = date.split('-');
        dateArray = dateArray.reverse();
        let result = dateArray.join('-');
        return result;
    },
    createEvent: (bodyData) => {
        let events = modelo.findAll();

        const lastProdId = events[events.length - 1].id;
        const date = modelo.handleDate(bodyData.date);
        const newEvent = {
            id: lastProdId + 1,
            ...bodyData
        };

        newEvent.date = date /* Formatea la fecha */

        events.push(newEvent);

        // Convertimos el Javascript en JSON
        const jsonData = JSON.stringify(events);
        fs.writeFileSync(eventsPath, jsonData, 'utf-8');

        return newEvent;
    },
    editEvent: (updatedEvent) => {
        let events = modelo.findAll();
        const eventIndex = events.findIndex(event => event.id == updatedEvent.id);
        events[eventIndex] = updatedEvent;
        const jsonData = JSON.stringify(events);
        fs.writeFileSync(eventsPath,jsonData,'utf-8');
    },
    deleteEvent: (updatedEvents)=>{
        const jsonData = JSON.stringify(updatedEvents,'utf-8');
        fs.writeFileSync(eventsPath,jsonData,'utf-8');
    }
};

module.exports = modelo;