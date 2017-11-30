'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// connecting our mongoDB database
_mongoose2.default.connect('mongodb://localhost/deckofcards');

// mongoDB schema
var deckofcardsModel = _mongoose2.default.model('deckofcards', {
    username: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    },
    gameCompleted: {
        type: Boolean,
        default: false
    }
});

// utility function to print errors
var logError = function logError(error) {
    if (error) throw error;
};

/*
  Here is where we're going put most of the serve logic
*/
var server = function server() {
    // We do this can send our html and js static files to the browser through the server
    app.use(_express2.default.static('client/public'));

    // finds a specific user 
    app.get('/isAutheticatedUser/:username/:password', function (request, response) {
        var _request$params = request.params,
            username = _request$params.username,
            password = _request$params.password;

        var userExists = deckofcardsModel.findOne({ username: username });
        if (userExists) response.send(true);else new deckofcardsModel({ username: username, password: password }).save(function (error, saveduser) {
            logError(error);
            response.send(saveduser);
        });
    });

    // 3000 is the port number, this could be any number from  0 to 9999
    app.listen(3000, function () {
        console.log('App listening on port 3000!');
    });
};

exports.default = server;