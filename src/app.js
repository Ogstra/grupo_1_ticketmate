const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes/mainRoutes.js');
const eventsRouter = require('./routes/events.js');
const usersRouter = require('./routes/users.js');
const methodOverride =  require('method-override');

app.use(session({
    secret: 'fr1563',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
app.use(cookieParser());

app.use(express.static('../public'));
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname,'./views'),
    path.join(__dirname,'./views/users'),
    path.join(__dirname,'./views/events'),    
]);



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/events', eventsRouter);

app.use('/', mainRouter);

app.use('/', usersRouter);

app.use('/cart', mainRouter);

// Error 404
app.get('*', function(req, res){
    res.render('404');
  });

app.listen(3000, () => {
    console.log("http://localhost:3000")
})