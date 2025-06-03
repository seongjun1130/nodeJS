module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        tableName: 'users'
    });
    User.associate = models => {
        User.hasOne(models.Blog, {
            foreignKey: 'user_id',
            as: 'blog'
        });
        User.hasMany(models.Comment, {
            foreignKey: 'user_id',
            as: 'comments'
        });
    }
    return User;
}