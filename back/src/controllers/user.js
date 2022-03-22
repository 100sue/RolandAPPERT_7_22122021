// Utilisation de "bcrypt" pour hasher le mot de passe.
// Utilisation de "jsonwebtoken" pour attribuer un token lors de la connexion.

const User = require("../models/User");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 
const db = require("../database/database");

const JWT_TOKEN = process.env.JWT_TOKEN;

// Inscription d'un utilisateur :
// Minimum 8 caractères, 1 lettre majuscule, 1 lettre minuscule et 1 nombre

exports.signup = (req, res, next) => {

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; 
    const regexName = /^([A-Za-zÀ-ÖØ-öø-ÿ]*((\s)))+[A-Za-zÀ-ÖØ-öø-ÿ]*$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; 

    if(email.match(regexMail) && name.match(regexName) && password.match(regexPassword)) {
        bcrypt
        .hash(password, 10)
        .then((hash) => {
            const user = new User ({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                admin: 0,
            });
            db.query(`INSERT INTO user SET ?`, user, (error, result) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json("erreur")
                } else {
                    return res.status(201).json({ message: 'Création du compte effectué' })
                };
            })
        })
        .catch(error => res.status(500).json({ error }));
    } else {
        throw new Error ("Un problème a été detecté lors de l'inscription")
    }
};

// Connexion d'un utilisateur :

exports.login = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  db.query(`SELECT * FROM user WHERE email = ?`, email, (error, result) => {
    
    if (result === "" || result == undefined) return res.status(401).json({ error: "Utilisateur introuvable" });
      
    bcrypt.compare(password, result[0].password).then((valid) => {

      if (!valid) return res.status(401).json({ error: "Mot de passe incorrect" });
      
      const id = result[0].id_user;
      const name = result[0].name;
      const admin = result[0].admin;

      const token = jwt.sign({ userId: id, adminRank: result[0].admin, name: name }, JWT_TOKEN, { expiresIn: "24h" });

      res.status(200).json({ token, userId: id, name: name, admin: admin });
    });
  });
};

// Suppression du compte d'un utilisateur :

exports.delete = (req, res, next) => {

  const id = req.params.id;

  db.query(`DELETE FROM user WHERE id_user = ?`, id, (error, result) => {
    if (error) {
      return res
        .status(400)
        .json({ error: "L'utilisateur n'a pas pu être supprimé" });
    }
    return res.status(200).json(result);
  });

};