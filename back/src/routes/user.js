const express = require('express');
const router = express.Router();

// Importation du "controller" concernant les "users"

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// Router de l'inscription.
// Router de la connexion.
// Router de la suppression 

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:id', auth, userCtrl.delete);



module.exports = router;