// import des packages et initialisation du routeur
const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");


//Création des différentes routes
router.get('/readAll/:PostId', auth, commentCtrl.getAllComments);
router.get('/isSignaled', commentCtrl.getAllSignaled);
router.post('/', auth, commentCtrl.createComment);
router.get('/:id/usercomments', auth, commentCtrl.getUserComments);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.put('/:id', auth, commentCtrl.modifyComment);


module.exports = router;