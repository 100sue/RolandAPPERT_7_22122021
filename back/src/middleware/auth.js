const jwt = require("jsonwebtoken");

const JWT_TOKEN = process.env.JWT_TOKEN;

module.exports = (req, res, next) => {
    try 
    {
        // Récupération du token dans le header, et du deuxième élément du tableau
        const token = req.headers.authorization.replace("Bearer ", "");
        // Vérification des token
        const decodedToken = jwt.verify(token, JWT_TOKEN);
        // Pour récupérer le user Id
        req.id_user = decodedToken.userId; 
        req.admin = decodedToken.adminRank;
        
        if(decodedToken.userId == undefined) {
            throw new Error
        }
        next();

    } 
    catch(err) 
    {
        res.status(401).json({ error: 'Requête non authentifiée !'});
    }
};