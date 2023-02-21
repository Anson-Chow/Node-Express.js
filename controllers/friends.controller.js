const model = require('../models/friends.model')

function postFriend(req, res) {
  if (!req.body.name) {
    //if req.body.name does not exist, it means the client is sending the wrong information. This is error code 400
    return res.status(400).json({
      //The if statement checks if the NAME is wrong. We don't have to check the body because express.json sets it to an empty object if no data was passed or is not in the form of JSON
      error: "Missing friend name",
    });
  }
  const newFriend = {
    name: req.body.name,
    id: model.length, //IMPORTANT* We can change it from friends.length to model.length and all instances of friends to models because we are exporting the array directly
    //We can now treat this module as if it were that array. Can change friends.push -> model.push etc.
  };
  model.push(newFriend);
  res.json(newFriend);
}

function getFriends(req, res) {
  res.json(model); //replace send with JSON. will ensure that the data passed in is treated as JSON
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendId); //express takes the parameter automatically
  const friend = model[friendId]; // will be undefined if friendID is not a number
  if (friend) {
    res.status(200).json(friend); //default sends 200 so its not exactly necessary
  } else {
    res.status(404).json({
      error: "Friend does not exist",
    });
  }
}

module.exports = {
    postFriend,
    getFriends,
    getFriend
}
