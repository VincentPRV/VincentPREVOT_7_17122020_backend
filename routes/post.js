// import des packages et initialisation du routeur
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
//const auth = require("../middleware/auth");


//Création des différentes routes
router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);




module.exports = router;