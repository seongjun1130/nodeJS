const bcrypt = require('bcrypt');

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
            unique: true,
        },
    }, {
        tableName: 'users'
    });
    
    User.prototype.authenticate = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

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
};