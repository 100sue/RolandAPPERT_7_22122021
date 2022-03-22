const mysql = require('mysql')

const Post = function(post) {
    this.id = post.id;
    this.id_user = post.id_user;
    this.content = post.content;
    this.image = post.image;
    this.date = post.date;
    this.status = post.status;
};

module.exports = Post;