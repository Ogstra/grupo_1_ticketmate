module.exports= (sequelize, DataType) => {
    const alias = 'Venue';

    const cols = {
        id: {
            type: DataType.INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },

            name: {
            type: DataType.STRING(255),
            allowNull: false
        }        
    };

    const config = {
        tableName: 'venues',
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",       
    };

    const Venue = sequelize.define(alias, cols, config); 
    Venue.associate = (models) => {
        Venue.belongsTo(models.Event, { //nombre del modelo        
            as: "venueRelation", //este es el nombre de la relacion
            foreing_key: "venue_id",
          });
      };
    return Venue
}