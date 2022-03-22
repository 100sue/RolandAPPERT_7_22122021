const db = require('../database/database');
const fs = require('fs');
const Post = require('../models/Post');
const { userInfo } = require('os');

// Création d'un post :

exports.createPost = (req, res, next) => {    
    date = new Date();
    month = (date.getMonth()+1) < 10 ? "0" +(date.getMonth()+1) : (date.getMonth()+1);
    day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let image = "";
    
    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    const post = new Post ({
        id_user: req.id_user,
        content: req.body.content,
        image: image,
        date: date.getFullYear() + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes(),
        status: 1
    });

    db.query(`INSERT INTO post SET ?`, post, (error, result) => {
        if(error) {
            return res.status(400).json({ error: error });
        }
        return res.status(201).json ({ message: "Post crée!" })
    });
}

// Modification d'un post :

exports.modifyPost = (req, res, next) => {
    db.query(`UPDATE post SET content = ? WHERE id = ?`, [req.body.content, req.params.id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le post n'a pas pu être modifié" })
        }
        return res.status(200).json(result);
    })
}

// Supprimer un post :

exports.deletePost = (req, res, next) => {
    const id = req.params.id
    const idUser = req.id_user
    let post;

    db.query(`SELECT * FROM post WHERE id = ?`, id, (error, result) => {
        post = result[0]

        if(post.id_user === idUser || req.admin === 1) {
            db.query(`DELETE FROM post WHERE id = ?`, id, (error, result) => {
                if (error) {
                    return res.status(400).json({ error: "Le post n'a pas pu être supprimé" })
                }
                return res.status(200).json(result);
            })
        } else {
            return res.status(403).json({ error: "Vous ne pouvez pas supprimer le post !"})
        }
    })
}

// Accès à un post :

exports.getOnePost = (req, res, next) => {
    const id = req.params.id
    const Data = {}
    db.query(`SELECT comment.*, user.name FROM comment INNER JOIN user ON user.id_user = comment.id_user WHERE id_post = ?`, id, (error, result) => {
        Data.comments = result
    })
    db.query(`SELECT post.*, user.name FROM post INNER JOIN user ON user.id_user = post.id_user WHERE id = ?`, id, (error, result) => {
        Data.post = result[0]
        return res.status(200).json(Data);
    })
}

// Accès à tous les posts :

exports.getAllPost = (req, res, next) => {
    let allComments = []
    let allPosts = []

    db.query(`SELECT comment.*, user.name FROM comment INNER JOIN user ON user.id_user = comment.id_user`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Vous ne pouvez pas accéder à tous les commentaires" })
        }
        result.forEach(element => {
            if (allComments[element.id_post] == undefined) {
                allComments[element.id_post] = []
            }
            allComments[element.id_post].push(element)
        })
    })

    db.query(`SELECT id, post.id_user, content, image, date, status, name FROM post INNER JOIN user ON user.id_user = post.id_user ORDER BY date DESC`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Vous ne pouvez pas accéder à tous les posts" })
        }
        result.forEach(element => {
            element.comments = allComments[element.id]
            allPosts.push(element)
        })
        return res.status(200).json( allPosts );
    })
}