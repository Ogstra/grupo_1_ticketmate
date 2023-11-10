const db = require("../../database/models");
const { Op, sequelize } = require("sequelize");

const mainController = {
    getCart: async (req, res) => {

        try {
            const carts = await db.User.findAll({
                nest: true,
                include: {
                    all: true,
                    nested: true,
                    where: { id: { [Op.gt]: 0 } }
                }
            });
            res.json(carts);
        } catch (error) {
            console.log(error);
        }

    },

    deleteOneCart: async (req, res) => {

        try {
            await db.Cart.destroy({
                where: { id: req.params.cartElementId }
            });
            res.json('Item del carrito eliminado');
        } catch (error) {
            console.log(error);
        }
    },

}

module.exports = mainController;