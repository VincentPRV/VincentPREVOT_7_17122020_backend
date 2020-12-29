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
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error })
        });
};

// Création de login (connexion du compte utilisateur)
exports.login = (req, res, next) => {
    User.findOne({ where: { username: req.body.username } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        username: user.username,
                        UserId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.JWT_SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};



exports.modifyUser = (req, res, next) => {
    const userObject = req.file ?
        {
            ...JSON.parse(req.body.user),
        } : { ...req.body };
    User.updateOne({ id: req.params.id }, { ...userObject, id: req.params.user.id })
        .then(() => res.status(200).json({ message: 'Objet Modifié!' }))
        .catch(error => res.status(400).json({ error }));
};

  

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };
      
