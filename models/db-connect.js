const Sequelize = require ('sequelize')
// définition du modèle sequelize
const sequelize = new Sequelize ('DBP7', 'vincent3', 'root', {host:'localhost', dialect:'mysql'})

// création des lignes de la BDD attendu (user, post, comment)
const db = {
    Sequelize,
    sequelize,
    user: require ('./User')(sequelize, Sequelize),
    post: require ('./Post')(sequelize, Sequelize),
    comment: require ('./Comment')(sequelize, Sequelize),
}

// création d'une méthode "cascade" pour facilité la suppression d'information
db.user.hasMany(db.post, {onDelete: "cascade", hooks: true})
db.user.hasMany(db.comment, {onDelete: "cascade", hooks: true})
db.post.hasMany(db.comment, {onDelete: "cascade", hooks: true})

// connexion à sequelize
sequelize.authenticate()
    .then( () => {console.log("Connexion réussi !")} )
    .catch( (error) => {
        console.log(error);
        console.log("Impossible de se connecter à la base de données !")
    })

module.exports = db;
