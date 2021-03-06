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
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
}

exports.getMe = function(req, res) {
    User.findById(req.userId, { password: 0 },
        function(err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
}