const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require('./routes/mainRoutes.js');
const eventsRouter = require('./routes/events.js');

app.use(express.static('../public'));
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname,'./views'),
    path.join(__dirname,'./views/users'),
    path.join(__dirname,'./views/events'),    
]);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/events', eventsRouter);

app.use('/', mainRouter);

app.use('/cart', mainRouter);

app.use('/login', mainRouter);

app.use('/register', mainRouter);

app.use('/detail', mainRouter);

/* app.get('/', (req, res) => {
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
}) */

app.listen(3000, () => {
    console.log("http://localhost:3000")
})