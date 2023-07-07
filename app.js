const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname,'/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'))
})

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/cart.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/register.html'))
})

app.get('/detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/detail.html'))
})


app.listen(3000, () => {
    console.log("http://localhost:3000")
})