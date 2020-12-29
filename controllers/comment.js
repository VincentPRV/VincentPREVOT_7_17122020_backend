// import des packages
const User = require('../models/db-connect').user;
const Comment = require('../models/db-connect').comment;

// Création de signup (enregistrement de compte utilisateur)
exports.createComment = (req, res, next) => {
    Comment.create({
        text: req.body.text,
        UserId: req.body.UserId,
        PostId: req.body.PostId,
    })
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
        .catch(error => res.status(400).json({ error }));
};

// Création de login (connexion du compte utilisateur)
exports.getAllComments = (req, res, next) => {
    Comment.findAll({ where: { PostId: req.params.PostId } })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(error => res.status(500).json({ error }));
};



exports.modifyComment = (req, res, next) => {
};



exports.deleteComment = (req, res, next) => {
};

exports.getOneComment = (req, res, next) => {
};
