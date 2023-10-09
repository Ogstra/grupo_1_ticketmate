module.exports= (sequelize, DataType) => {
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
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'         
    };

    const Category = sequelize.define(alias, cols, config); 
    
    return Category
}