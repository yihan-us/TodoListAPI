'use strict';


var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    config = require('../../config'), // get our config file
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs');

exports.signup = function(req, res) {
    User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            admin: req.body.admin
        },
        function(err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
}

exports.login = function(req, res) {

}

exports.getMe = function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id, 
        	{ password: 0 },
        	function(err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
    })
}