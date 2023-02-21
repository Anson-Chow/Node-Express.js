const path = require('path')

function getMessages(req, res) {
  res.render('messages', {
    title: 'Messages to my friends!',
    friend: 'Albert Einstein',
  })
  // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'skimountain.jpg'))
  // res.send("<ul><li>Hello how are you?</li></ul>");
}

function postMessage(req, res) {
  console.log("Updating messages...");
}

module.exports = {
    getMessages,
    postMessage,
}