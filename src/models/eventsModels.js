const { log } = require('console');
const fs = require('fs');
const path = require('path');
const eventsPath = path.join(__dirname,'../data/eventsDataBase.json');

const modelo = {
    findAll: () => {
        const result = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));
        return result;
    },
    handleDate:(date)=>{
        let dateArray = date.split('-');
        dateArray=dateArray.reverse();
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
    }
};

module.exports = modelo;