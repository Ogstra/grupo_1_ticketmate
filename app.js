const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/cart.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'))
})

app.get('/detail', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/detail.html'))
})


app.listen(3000, () => {
    console.log("http://localhost:3000")
})
