// import des packages et initialisation du routeur
const express = require("express");
const router = express.Router();
const  commentCtrl = require("../controllers/comment");
//const auth = require("../middleware/auth");


//Création des différentes routes
router.get('/:PostId', commentCtrl.getAllComments);
router.post('/',  commentCtrl.createComment);
router.get('/:id',  commentCtrl.getUserComments);
router.get('/:id',  commentCtrl.getOneComment);
router.put('/:id',  commentCtrl.modifyComment);
router.delete('/:id',  commentCtrl.deleteComment);


module.exports = router;