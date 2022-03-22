// Ajout de "mysql" qui permet de se connecter à la base de données de MySQL.
// Création de la connexion à la base de données MySQL.

const mysql = require('mysql');
const db = mysql.createConnection({
  
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
  
});

// Connexion à la base de données :

db.connect(function(err) {

  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");

});

module.exports = db;