const mainController = {
    getIndex: function (req, res) {
        res.render('index.ejs');
    },
    getLogin: function (req, res) {
        res.render('login.ejs')
    },

    getRegister: function (req, res) {
        res.render('register.ejs')
    },

    getCart: function (req, res) {
        res.render('cart.ejs')
    }
}

module.exports = mainController;