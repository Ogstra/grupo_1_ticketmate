const fs = require('fs');
const path = require('path');
const eventsPath = path.join(__dirname,'../data/eventsDataBase.json');

const modelo = {
    findAll: () => {
        const result = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));
        return result;
    },
    createEvent: (bodyData) => {
        let events = modelo.findAll();

        const lastProdId = events[events.length - 1].id;

        const newEvent = {
            id: lastProdId + 1,
            name: bodyData.name,
            price: bodyData.price,
            stock: bodyData.stock,
            category: bodyData.category,
            place: bodyData.place,
            date: bodyData.date,
            time: bodyData.time,
            description: bodyData.description  
        };

        events.push(newEvent);

        // Convertimos el Javascript en JSON
        const jsonData = JSON.stringify(events);
        fs.writeFileSync(eventsPath, jsonData, 'utf-8');
    }
};

module.exports = modelo;