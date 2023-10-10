module.exports = (sequelize, DataType) => {
  const alias = "Date";

  const cols = {
    id: {
      type: DataType.INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
    },

    date_time: {
      type: DataType.DATE(255),
      allowNull: false,
    },

    stock: {
      type: DataType.INTEGER(20),
      allowNull: false,
    },

    price: {
      type: DataType.DECIMAL(8, 2),
      allowNull: false,
    },

    event_id: {
      type: DataType.INTEGER(20),
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },
  };

  const config = {
    tableName: "dates",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const Date = sequelize.define(alias, cols, config);
  Date.associate = (models) => {
    Date.hasMany(models.Event, {//nombre del modelo      
      as: "DateEventRelation", //este es el nombre de la relacion
      foreing_key: "event_id",
    });
  };

  return Date;
};
