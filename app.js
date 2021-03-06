// import des packages nécéssaire
const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const helmet = require("helmet");


// configure et autorise les accès extérieurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


const db = require('./models/db-connect');
db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
  });

// Ajout des routes d'identification et d'authentification
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


// Enregistrement des routeurs, activation d'helmet et de bodyparser
app.use(helmet());
app.use(bodyParser.json())
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);



// exporte l'application
module.exports = app;