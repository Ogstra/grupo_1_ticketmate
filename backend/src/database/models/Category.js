module.exports = (sequelize, DataType) => {
    const alias = 'Category';

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
        tableName: 'categories',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);
    Category.associate = (models) => {
        Category.hasMany(models.Event, { //nombre del modelo        
            as: "event", //este es el nombre de la relacion
            foreignKey: "category_id",
        });
    };

    return Category
}