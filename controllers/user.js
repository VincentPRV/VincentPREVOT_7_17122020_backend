// import des packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/db-connect').user;

// Création de signup (enregistrement de compte utilisateur)
exports.signup = (req, res, next) => {
    console.log('********************', req.body, '********************')
   bcrypt.hash(req.body.password, 10)
        .then(hash => {
        User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash
        })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error })
        });
};

// Création de login (connexion du compte utilisateur)
exports.login = (req, res, next) => {
    User.findOne({ where: {username:req.body.username}})
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    process.env.JWT_SECRET_TOKEN,
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

