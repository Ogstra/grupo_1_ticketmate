module.exports = (sequelize, DataTypes) => {
    const alias = 'Cart';

    const cols = {
        id:{
            type: DataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'uuid'
            }
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'events',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }

    const config = {
        tableName: 'cart',
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, { //nombre del modelo        
          as: "user", //este es el nombre de la relacion
          foreignKey: "user_id",
        })

        Cart.belongsTo(models.Event, { //nombre del modelo        
          as: "events", //este es el nombre de la relacion
          foreignKey: "event_id",
        })
    }

    return Cart;
}