// import des packages
const User = require('../models/db-connect').user;
const Post = require('../models/db-connect').post;

// Création de signup (enregistrement de compte utilisateur)
exports.createPost = (req, res, next) => {
    Post.create({
        text: req.body.text,
        UserId: req.body.UserId,
        title: req.body.title,
        username: req.body.username
    })
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ error }));
};

// Création de login (connexion du compte utilisateur)
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
    })
        .then(posts => {

            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllSignaled = (req, res, next) => {
    Post.findAll({ where: { isSignaled: true } })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json({ error }));
};

exports.userPosts = (req, res, next) => {
    Post.findAll({ where: { username: req.params.username } })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
        } : { ...req.body };
    console.log(postObject, req.params.id)
    Post.update(postObject, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post modifié avec succès' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (!post) {
                return res.status(401).json({ error: 'Post non trouvé !' });
            }
            post.destroy({ id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
};

exports.getOnePost = (req, res, next) => {
};
