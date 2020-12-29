module.exports= (sequelize, Sequelize) => {
    const post = sequelize.define("Post", {
        text:{type: Sequelize.STRING, allowNull: false},
        isSignaled:{type: Sequelize.BOOLEAN, defaultValue: false},
    })
    return post
}

