import express from 'express'
import path from 'path'
import mongoose from 'mongoose'

var app = express();

// connecting our mongoDB database
mongoose.connect('mongodb://localhost/deckofcards');

// mongoDB schema
let deckofcardsModel = mongoose.model('deckofcards', {
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
})

// utility function to print errors
var logError = (error) => {
    if (error)
        throw error;
}

/*
  Here is where we're going put most of the serve logic
*/
var server = () => {
    // We do this can send our html and js static files to the browser through the server
    app.use(express.static('client/public'))

    // finds a specific user 
    app.get('/isAutheticatedUser/:username/:password', (request, response) => {
        let { username, password } = request.params;
        let userExists = deckofcardsModel.findOne({ username });
        if (userExists)
            response.send(true)
        else
            new deckofcardsModel({ username, password }).save((error, saveduser) => {
                logError(error);
                response.send(saveduser);
            })
    })

    // 3000 is the port number, this could be any number from  0 to 9999
    app.listen(3000, () => {
        console.log('App listening on port 3000!')
    })
}

export default server;
