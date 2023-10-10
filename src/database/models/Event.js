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

    thumbnail: {
      type: DataType.STRING(255),
      allowNull: false,
    },

    category_id: {
      type: DataType.INTEGER(20),
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },

    venue_id: {
      type: DataType.INTEGER(20),
      allowNull: false,
      references: {
        model: "venues",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },

    image_id: {
      type: DataType.INTEGER(20),
      allowNull: false,
      references: {
        model: "images",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },
  };

  const config = {
    tableName: "events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const Event = sequelize.define(alias, cols, config);
  Event.associate = (models) => {
    Event.hasMany(models.Image, { //nombre del modelo      
      as: "imageRelation", //este es el nombre de la relacion
      foreing_key: "image_id",
    }),

      Event.hasMany(models.Category, { //nombre del modelo        
        as: "categoryRelation", //este es el nombre de la relacion
        foreing_key: "category_id",
      }),

      Event.hasMany(models.Venue, { //nombre del modelo        
        as: "venueRelation", //este es el nombre de la relacion
        foreing_key: "venue_id",
      }),
      
      Event.belongsTo(models.Cart_Event, {//nombre del modelo      
        as: "eventRelation", //este es el nombre de la relacion
        foreing_key: "event_id", 
    }),
    
      Event.belongsTo(models.Date, {//nombre del modelo      
        as: "DateEventRelation", //este es el nombre de la relacion
        foreing_key: "event_id", 
    });
  };

  return Event;
};
