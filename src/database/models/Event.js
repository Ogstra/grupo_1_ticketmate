module.exports = (sequelize, DataType) => {
  const alias = "Event";

  const cols = {
    id: {
      type: DataType.INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataType.STRING(255),
      allowNull: false,
    },

    category_id: {
      type: DataType.INTEGER(20),
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      }
    },

    venue_id: {
      type: DataType.INTEGER(20),
      allowNull: true,
      references: {
        model: "venues",
        key: "id",
      }
    },

    image: {
      type: DataType.INTEGER(20),
      allowNull: false,
      references: {
        model: "images",
        key: "id",
      }
    },

    date: {
      type: DataType.DATE(255),
      allowNull: false,
    },

    time: {
      type: DataType.DATE(255),
      allowNull: true,
    },
    
    stock: {
      type: DataType.INTEGER(255),
      allowNull: false,
      defaultValue: 0
    },

    price: {
      type: DataType.INTEGER(20),
      allowNull: false,
      defaultValue: 0
    }
  };

  const config = {
    tableName: "events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const Event = sequelize.define(alias, cols, config);
  Event.associate = (models) => {
      Event.belongsTo(models.Category, { //nombre del modelo        
        as: "category", //este es el nombre de la relacion
        foreignKey: "category_id",
      })

/*       Event.belongsTo(models.Venue, { //nombre del modelo        
        as: "venueRelation", //este es el nombre de la relacion
        foreignKey: "venue_id"
      }), */
      
/*       Event.belongsTo(models.Cart, {//nombre del modelo      
        as: "eventRelation", //este es el nombre de la relacion
        foreignKey: "event_id", 
        through: "cart_events"
    }) */
  };

  return Event;
};
