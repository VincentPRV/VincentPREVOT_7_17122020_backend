module.exports= (sequelize, Sequelize) => {
    const comment = sequelize.define("Comment", {
        text:{type: Sequelize.STRING, allowNull: false},
        isSignaled:{type: Sequelize.BOOLEAN, defaultValue: false},
    })
    return comment
}

