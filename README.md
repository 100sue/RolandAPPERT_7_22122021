 ## Projet 7 du parcours de Developpeur Web chez OpenClassrooms.  ##

 Réseau Social Groupomania: projet frontend et backend.

Ce projet utilise NodeJs, Express et MySQL pour le backend, et Vue pour le frontend.

 ## Installation des prérequis et lancement de l'application :  ##

- INSTALLATION :

Veuillez cloner ce dépôt : il vous fournira les deux dossiers nécessaires : backend et frontend.

- ACCÈS À LA BASE DE DONNÉES :

- Vous devez avoir MySQL installé sur votre ordinateur. Cette application utilise le plugin dotenv pour masquer les données de connexion. 
- Dans le dossier backend, vous trouverez un fichier ".env__", qui vous donnera accès à la base de données MySQL groupomania. 
- Veuillez d’abord créer dans MySQL une base de données, un utilisateur avec son mot de passe qui aura accès à cette base de données.
- Puis remplissez avec les valeurs correctes pour les variables "DB_DATABASE", "DB_USER" et "DB_PASS", dans le ficher ".env__" et changez son nom en ".env".

- EXÉCUTER L'APPLICATION :

- Vous aurez besoin de deux fenêtres de terminal : une pour le frontend, une pour le backend. 
- Sur le terminal backend : exécutez "npm install, puis "node server" ou "nodemon server". 
- Le serveur doit fonctionner sur localhost avec le port par défaut 8080. 
- Puis, sur le terminal frontend : lancez "npm install pour installer tous les plugins nécessaires, puis "npm start". 
- Le frontend de l'application est visible sur http:// localhost: 3000/.
    
    
    ### L'application :  ###
   

Lancez l'application : ouvrez l'application en cliquant sur http://localhost:8080/

Pour l'Utilisation de l'application : 
- Créez votre compte
- Accédez au fil d'actualité en vous identifiant.


This is an exercice as part of my developer training for OpenClassrooms :

Tools used for this project : HTML5, CSS3,JavaScript, Node.js, Vue.js, Express, SQL & MySQL, Git & Github, CRUD Operations, OWASP & RGPD Standards.

I also used a lot of depencies like : Bcrypt, Dotenv, Helmet, Jsonwebtoken, Multer, Password-validator.

