module.exports = (sequelize, DataTypes) => {

    const alias = 'User';

    const cols = {
        uuid: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }

    };

    const config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const User = sequelize.define(alias, cols, config);
    User.associate = (models) => {
        User.hasMany(models.Cart, {//nombre del modelo      
            as: "userRelation", //este es el nombre de la relacion
            foreing_key: "user_id",
        })
    };

    return User;
}