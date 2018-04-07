'use strict';
module.exports = function(app) {
    var auth = require('../controllers/authController'),
    verifyToken = require('../../middleware/verifyToken');

    // todoList Routes
    app.route('/login')
        .post(auth.login);


    app.route('/signup')
        .post(auth.signup)


    app.route('/me')
    	.get(verifyToken, auth.getMe)
};