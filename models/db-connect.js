const Sequelize = require ('sequelize')

const sequelize = new Sequelize ('DBP7', 'vincent3', 'root', {host:'localhost', dialect:'mysql'})

const db = {
    Sequelize,
    sequelize,
    user: require ('./User')(sequelize, Sequelize),
    post: require ('./Post')(sequelize, Sequelize),
    comment: require ('./Comment')(sequelize, Sequelize),
}

db.user.hasMany(db.post, {onDelete: "cascade", hooks: true})
db.user.hasMany(db.comment, {onDelete: "cascade", hooks: true})
db.post.hasMany(db.comment, {onDelete: "cascade", hooks: true})

sequelize.authenticate()
    .then( () => {console.log("Connexion réussi !")} )
    .catch( (error) => {
        console.log(error);
        console.log("Impossible de se connecter à la base de données !")
    })

module.exports = db;
