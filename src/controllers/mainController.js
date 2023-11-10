const db = require("../database/models");
const { Op } = require("sequelize");

const mainController = {
    getIndex: async (req, res) => {
        console.log(req.session);
        console.log("-----------------------");
        console.log(req.cookies.auth);
        const userLogged = req.session.userLogged;
        try {
            const events = await db.Event.findAll({
                limit: 9,
                raw: true,
                order: [["date", "ASC"]]
            });       
            res.render('index.ejs', {userLogged, events});
        } catch (error) {
            console.log(error);      
        }
    },
    getLogin: function (req, res) {
        res.render('login.ejs')
    },

    getRegister: function (req, res) {
        res.render('register.ejs')
    },

	getCart: async (req, res) => {
        const userLogged = req.session.userLogged;
        if (userLogged) {
          var userID = userLogged.uuid;
        } else {
          var userID = req.session.id;
        }

		try {
			/* const User = await db.User.findByPk("3283a87e-9b7d-4579-9ea9-e3971d16f709", {
                nest: true,
                include: {all: true, nested: true}
            }) */
            const Cart = await db.Cart.findAll({
                include: [{
                    as: "events", 
                    model: db.Event, 
                    include: {
                        as: "venue", 
                        model: db.Venue
                    }
                }, "user"],
                nest: true,
                where: { user_id: userID }});
			res.render('cart.ejs', { cart: Cart });	
           /*  res.json(Cart) */
            //console.log(Cart);
		} catch (error) {	
            console.log(error);
		}
	},

    deleteOneCart: async (req, res) => {
        
        try {
            await db.Cart.destroy({
                where: {id: req.params.cartElementId}
            })
        } catch (error) {
            console.log(error);
        }
        res.redirect('/cart')
    },

    addOneCart: async (req,res) => {

        const userLogged = req.session.userLogged

        if (userLogged) {
            var userID = userLogged.uuid;
          } else {
            var userID = req.session.id;
          }

          
        const eventInCart = await db.Cart.findOne({
            where: {
                event_id: req.params.id,
                user_id: userID
            }
        })
        
        const selectedEvent = {
            user_id: userID ,
            event_id: req.params.id,
            quantity: req.body.quantity,
        }

        if(eventInCart){
            const newQuantity = eventInCart.quantity + Number(req.body.quantity)
            await db.Cart.update({quantity: newQuantity},{
                where: {
                    event_id: req.params.id,
                    user_id: userID
                }
            });
        }else{
            await db.Cart.create(selectedEvent);
        }
         
        res.redirect('/cart');

    }
}

module.exports = mainController;