module.exports = (sequelize, DataType) => {
  const alias = "Cart_Event";

  const cols = {
    id: {
      type: DataType.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },

    event_id: {
      type: DataType.INTEGER(20),
      allowNull: false,
      references: {
        model: "events", //nombre de la tabla
        key: "id", // key al que hace referencia
      }
    },

    quantity: {
      type: DataType.INTEGER(11),
      allowNull: false,
    },

    cart_id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      references: {
        model: "carts", //nombre de la tabla
        key: "id", // key al que hace referencia
      }
    },

    created_at: {
      type: DataType.DATE,
      allowNull: false,
    },
  };

  const config = {
    tableName: "cart_events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const Cart_Event = sequelize.define(alias, cols, config);
/*   Cart_Event.associate = (models) => {
        Cart_Event.hasMany(models.Cart, { //nombre del modelo  
        as: "cartRelation", //este es el nombre de la relacion
        foreing_key: "cart_id", 
        }),

        Cart_Event.hasMany(models.Event, { //nombre del modelo      
          as: "eventRelation", //este es el nombre de la relacion
          foreing_key: "event_id", 
        });
    }; */

  return Cart_Event;
};
