module.exports = (sequelize, DataType) => {
  const alias = "Cart";

  const cols = {
    id: {
      type: DataType.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataType.STRING(36),
      allowNull: true,
      references: {
        model: "users",
        key: "uuid",
      }
    },

    created_at: {
      type: DataType.DATE,
      allowNull: true,
    },
  };

  const config = {
    tableName: "carts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const Cart = sequelize.define(alias, cols, config);
    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {//nombre del modelo    
        as: "userRelation", //este es el nombre de la relacion
        foreing_key: "user_id",
    }),
    
    Cart.associate = (models) => {
        Cart.belongsTo(models.Cart_Event, {
        as: "cartRelation",
        foreing_key: "cart_id",
    });
    };
  };

  return Cart;
};
