const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes/mainRoutes.js');
const eventsRouter = require('./routes/events.js');
const usersRouter = require('./routes/users.js');
const methodOverride =  require('method-override');
const copyJWTCookie = require('./middlewares/copyJWTCookie');

app.use(express.static('../public'));
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname,'./views'),
    path.join(__dirname,'./views/users'),
    path.join(__dirname,'./views/events'),    
]);

const secretKey = 'BX50dHm/5UXyeS57Zi3WZjOq0TCPBUQ2';

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser(secretKey));
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: null /* session */},
}));

// Global Middlewares
app.use('*', copyJWTCookie);

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