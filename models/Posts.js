module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(50),
        }
    }, {
        tableName: 'posts',
    });

    Post.associate = models => {
        Post.belongsTo(models.Blog, {
            foreignKey: 'blog_id',
            as: 'blog',
            onDelete: 'CASCADE'
        });
        Post.hasMany(models.Comment, {
            foreignKey: 'post_id',
            as: 'comments'
        });
    };
    return Post;
}