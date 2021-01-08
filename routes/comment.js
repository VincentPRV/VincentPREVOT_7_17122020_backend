// import des packages et initialisation du routeur
const express = require("express");
const router = express.Router();
const  commentCtrl = require("../controllers/comment");
//const auth = require("../middleware/auth");


//Création des différentes routes
router.get('/readAll/:PostId', commentCtrl.getAllComments);
router.get('/isSignaled', commentCtrl.getAllSignaled);
router.post('/',  commentCtrl.createComment);
router.get('/:id/usercomments',  commentCtrl.getUserComments);
router.delete('/:id',  commentCtrl.deleteComment);
router.put('/:id', commentCtrl.modifyComment);


module.exports = router;