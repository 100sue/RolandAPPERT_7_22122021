// Jsonwebtoken : pour créer des tokens aléatoire et unique pour la connexion.
// Dotenv : pour protéger les informations de connexion vers la BDD.
// Puis, on exporte le module de token :
// On récupérer le token dans le header "autorisation", on le split et on récupére le deuxième élément du tableau renvoyé.
// On décode le token en le vérifiant et on extrait le userId grace au token.

const jwt = require('jsonwebtoken'); 
// require('dotenv').config(); 


module.exports = (req, res, next) => { 
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, process.env.RND_TKN);
        const userId = decodedToken.userId; 
        req.auth = { 
            userId: userId
        }; 
        next();
        } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};


// code en attente :
// Si on a un userId dans le corps de la requête et qu'il est différent du userId on renvoie "erreur" 401, problème d'authentification.
// Si tout va bien, suivant.

// require('dotenv').config(); 
//module.exports = (req, res, next) => {
    //try {
       // const token = req.headers.authorization.split(" ")[1];
       // const decodedToken = jwt.verify(token, process.env.RND_TKN);
       // const userId = decodedToken.userId;
       // req.auth = { userId };
       // if (req.body.userId && req.body.userId !== userId) {
        //    throw 'Invalid user ID';
       // } else {
            
       //     next();
       // }
   // }
   // catch (error) {
   //     res.status(401).json({ error: error | 'Requête non authentifiée !' });
   // }
//};