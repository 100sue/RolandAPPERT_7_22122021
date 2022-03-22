const mysql = require('mysql')

const User = function(user) {
    this.id_user = user.id_user;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.admin = user.admin;
};

module.exports = User;