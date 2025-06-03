module.exports = (sequelize, DataTypes) =>{
    const Comment = sequelize.define('Comment',{
        content : {
            type : DataTypes.STRING(255),
            allowNull : false,
        },
    },{
        tableName : 'comments'
    });

    Comment.associate = models =>{
        Comment.belongsTo(models.Post,{
            foreignKey : 'post_id',
            as: 'post',
            omDelete : 'CASCADE'
        });
        Comment.belongsTo(models.User,{
            foreignKey: 'user_id',
            as: 'author',
        })
    }
    return Comment;
}