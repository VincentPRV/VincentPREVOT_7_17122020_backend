// import des packages et initialisation du routeur
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

//Création des différentes routes
router.get('/', auth, postCtrl.getAllPosts);
router.get('/isSignaled', postCtrl.getAllSignaled);
router.get('/userPosts/:username', auth, postCtrl.userPosts);
router.post('/',auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;