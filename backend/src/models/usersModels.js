const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/usersDataBase.json');
const uuid = require('uuid');

const modelo = {
    createUser: (bodyData) => {
        let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));;

        const newUser = {
            id: uuid.v4(),
            ...bodyData
        };
        
        users.push(newUser);
        
        // Convertimos el Javascript en JSON
        const jsonData = JSON.stringify(users);
        fs.writeFileSync(usersPath, jsonData, 'utf-8');
        return newUser;
    },
};

module.exports = modelo;