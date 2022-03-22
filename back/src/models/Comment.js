const mysql = require('mysql')

const Comment = function(comment) {
    this.id = comment.id;
    this.id_user = comment.id_user;
    this.id_post = comment.id_post;
    this.content = comment.content;
    this.date_creation = comment.date_creation;
    this.status = comment.status;
};

module.exports = Comment; 