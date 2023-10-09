module.exports= (sequelize, DataType) => {
    const alias = 'Image';

    const cols = {
        id: {
            type: DataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        file:{
            type: DataType.STRIMG,
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

    return Image
}