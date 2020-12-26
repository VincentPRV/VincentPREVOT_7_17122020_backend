const Sequelize = require ('sequelize')

const sequelize = new Sequelize ('DBP7', 'vincent3', 'root', {host:'localhost', dialect:'mysql'})

const db = {
    Sequelize,
    sequelize,
    user: require ('./User')(sequelize, Sequelize)
}

sequelize.authenticate()
    .then( () => {console.log("Connexion réussi !")} )
    .catch( (error) => {
        console.log(error);
        console.log("Impossible de se connecter à la base de données !")
    })

module.exports = db;