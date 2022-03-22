const db = require('../database/database');
const Comment = require('../models/Comment');

// Création d'un commentaire :

exports.createComment = (req, res, next) => {

    date = new Date ();
    month = (date.getMonth()+1) < 10 ? "0" +(date.getMonth()+1) : (date.getMonth()+1);
    day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    
    const comment = new Comment ({
        id_user: req.id_user,
        id_post: req.params.id,
        content: req.body.content,
        date_creation: date.getFullYear() + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes(),
        status: 1
    });

    db.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
        if(error) {
            res.status(400).json({ error: 'Commentaire non crée' })
        } else {
            res.status(200).json({ result })
        }
    });
}

// Suppression d'un commentaire :

exports.deleteComment = (req, res, next) => {
    const id = req.params.id
    const idUser = req.id_user
    let comment;

    db.query(`SELECT * FROM comment WHERE id = ?`, id, (error, result) => {
        comment = result[0]

        if(comment.id_user === idUser || req.admin === 1) {
            db.query(`DELETE FROM comment WHERE id = ?` , id, (error, result) => {
                if (error) return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" });
                return res.status(200).json(result);
            });

        } else {
            return res.status(403).json({ error: "Vous ne pouvez pas supprimer le commentaire !" })
        }
    })
}