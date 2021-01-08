const { comment } = require('../models/db-connect');

// import des packages
const User = require('../models/db-connect').user;
const Comment = require('../models/db-connect').comment;


exports.createComment = (req, res, next) => {
    Comment.create({
        text: req.body.text,
        UserId: req.body.UserId,
        PostId: req.body.PostId,
    })
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSignaled = (req, res, next) => {
    Comment.findAll({ where: { isSignaled: true } })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        where: { PostId: req.params.PostId }, order: [
            ['createdAt', 'DESC'],
        ],
    })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getUserComments = (req, res, next) => {
    Comment.findAll({ where: { UserId: req.params.id } })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            if (!comment) {
                return res.status(401).json({ error: 'Commentaire non trouvé !' });
            }
            comment.destroy({ id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
};

exports.modifyComment = (req, res, next) => {
    const commentObject = req.file ?
        {
            ...JSON.parse(req.body.comment),
        } : { ...req.body };
    Comment.update(commentObject, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire modifié avec succès' }))
        .catch(error => res.status(400).json({ error }));
};