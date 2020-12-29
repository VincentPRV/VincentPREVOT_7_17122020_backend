// import des packages
const User = require('../models/db-connect').user;
const Post = require('../models/db-connect').post;

// Création de signup (enregistrement de compte utilisateur)
exports.createPost = (req, res, next) => {
    Post.create({
        text: req.body.text,
        UserId: req.body.UserId,
        title: req.body.title,
    })
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ error }));
};

// Création de login (connexion du compte utilisateur)
exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json({ error }));
};



exports.modifyPost = (req, res, next) => {
};



exports.deletePost = (req, res, next) => {
};

exports.getOnePost = (req, res, next) => {
};
