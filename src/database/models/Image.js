module.exports= (sequelize, DataType) => {
    const alias = 'Image';

    const cols = {
        id: {
            type: DataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        file:{
            type: DataType.STRING,
            allowNull: true
        }        
    };

    const config = {
        tableName: 'images',
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",      
    };

    const Image = sequelize.define(alias, cols, config); 
    Image.associate = (models) => {
        Image.belongsTo(models.Event, { //nombre del modelo      
          as: "imageRelation", //este es el nombre de la relacion
          foreing_key: "image_id",
        });
      };
    

    return Image
}