/* // import des packages et initialisation du routeur
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Création des différentes routes
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPosts);
router.delete('/:id', auth, postCtrl.deletePosts);
router.post('/:id/like', auth, postCtrl.addLikes);



module.exports = router;*/