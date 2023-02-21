const express = require('express')

const friendsController = require('../controllers/friends.controller') //importing modules 

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => { //Custom middleware for the friends router
    console.log('ip address:', req.ip)
    next();
})
friendsRouter.post('/', friendsController.postFriend); //These paths are relative to the router that they're mounted on 
friendsRouter.get("/", friendsController.getFriends);//By doing it this way, we don't ahve to worry about the other paths (/messages) in the application
friendsRouter.get('/:friendId', friendsController.getFriend)

module.exports = friendsRouter;