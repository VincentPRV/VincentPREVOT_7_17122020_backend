module.exports= (sequelize, Sequelize) => {
    const user = sequelize.define("User", {
        email:{type: Sequelize.STRING, allowNull: false, unique: true}, 
        username:{type: Sequelize.STRING, allowNull: false, unique: true}, 
        password:{type: Sequelize.STRING, allowNull: false}
    })
    return user
}

