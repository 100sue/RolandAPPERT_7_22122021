// Importation des npm nécessaires afin de crypter les informations (pour créer des token introuvables et aléatoires).
// C'est-à-dire : sécuriser la connexion au compte.
// Puis, on importe le "model" de création utilisateur.

const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

// Signup : hashage 10 fois du password avec bcrypt.
// Puis, création d'un nouvel utilisateur.
// En récupèrant le corps de la requête (= email), et "hash" du password quand l'utilisateur le crée.
// Puis, sauvegarde de l'utilisateur dans la BDD.

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      var role = 'utilisateur';
      if (req.body.email.includes("@admin")) {
        role = 'administrateur';
      }
      const signupUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        job: req.body.job,
        email: req.body.email,
        password: hash,
        role: role, 
        avatar: `${req.protocol}://${req.get("host")}/avatars/avatar-groupomania.jpg`
      });
      signupUser.save() 
        .then(() => res.status(201).json({ 
            userId: signupUser._id,
            token: jwt.sign(  
              { userId: signupUser._id },
              process.env.RND_TKN, 
              { expiresIn: '24h' }
            )
        }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}; 

// Login : on vérifie si l'email utilisateur existe dans la BDD.
// S'il n'existe pas = erreur 401.
// Puis, on compare les entrées et les données :
// si c'est différent = erreur 401.
// si c'est ok (statut 200), on envoie l'objet suivant : contenant les données qu'on veut encoder dans ce token.
// avec une clé secrète qui est valide pendant 24h.

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'identifiant et/ou mot de passe incorrect !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ 
            userId: user._id,
            token: jwt.sign( 
              { userId: user._id },
              process.env.RND_TKN, 
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Acceder a un utilisateur :

exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id})
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    res.status(404).json({
      error: error,
    });
  });
};

// Modifier un utilisateur :

exports.modifyUser = (req, res, next) => {
  var userObject = {}; 
  if (req.file) {
    userObject = {
      ...JSON.parse(req.body.user),
      avatar: `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`,
    };
  } else {
    userObject = { ...JSON.parse(req.body.user) }; 
  }
  delete userObject._userId; 
  User.findOne({_id: req.params.id}) 
    .then((user) => {
      User.updateOne(
        {_id: req.params.id},
        {...userObject, _id: req.params.id})
        .then(() => {
          var avatar = user.avatar;
          if (userObject.avatar != null) {
            avatar = userObject.avatar;
          }
          res.status(200).json({ message: "Modification(s) effectuée(s)", avatar: avatar });
        })
        .catch((error) => res.status(400).json({ error }));
    })
  .catch((error) => {
    res.status(400).json({ error });
  });
};