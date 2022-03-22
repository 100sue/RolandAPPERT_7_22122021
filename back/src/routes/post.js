const express = require('express');
const router = express.Router();

// Auth permet de sécuriser les routes.
// Multer pour gérer les images.
// Importation du "controller" concernant les "post"

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');


// Router de la création du post.
// Router de la modification du post.
// Router de la suppression du post.
// Router de l'accès à tous les posts.
// Router de l'accès à un post.

router.post('/create', auth, multer, postCtrl.createPost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/all', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);

module.exports = router;