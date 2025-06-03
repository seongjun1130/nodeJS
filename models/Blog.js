module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'blogs'
    });

    Blog.associate = models => {
        Blog.belongsTo(models.User, {
            foreignkey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE'
        });

        Blog.hasMany(models.Post, {
            foreignkey: 'blog_id',
            as: 'posts'
        });
    };
    return Blog;
}