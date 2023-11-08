const db = require("../database/models");

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
                where: { user_id: userLogged.uuid }});
			res.render('cart.ejs', { cart: Cart });	
            //res.json(Cart)
            //console.log(Cart);
		} catch (error) {	
            console.log(error);
		}
	},
}

module.exports = mainController;