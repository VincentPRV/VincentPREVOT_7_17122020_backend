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
db.post.belongsTo(db.user, {onDelete: "cascade", hooks: true})
db.comment.belongsTo(db.user, {onDelete: "cascade", hooks: true})
db.comment.belongsTo(db.post, {onDelete: "cascade", hooks: true})

// connexion à sequelize
sequelize.authenticate()
    .then( () => {console.log("Connexion réussi !")} )
    .catch( (error) => {
        console.log(error);
        console.log("Impossible de se connecter à la base de données !")
    })

module.exports = db;
