//Express sends html by default, but if you send an object it will be in JSON format
//Building our own middleware and using PostMan to test our API 

const express = require("express");
const path = require('path') //This built in path module allows us to access paths from any folder. 

const friendsRouter = require('./routes/friends.router')
const messagesRouter = require('./routes/messages.router')

const app = express();

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

const PORT = 3000;

app.use((req, res, next) => { //This custom middleware measures how long our request(s) takes. 
  const start = Date.now();
  next(); //This is middleware, not the final destination so we need to call the next(). ALWAYS call the next function in middleware
  const delta = Date.now() - start
  console.log(`${req.method} ${req.baseUrl} ${req.url} ${delta}ms`);
})

app.use('/site', express.static(path.join(__dirname, 'public'))) //Goes to the directory and then searches for the public folder. So if we were in the routes folder and we ran our server, we can still find the public folder. Otherwise it would cause an error 

app.use(express.json()); //looks at the request type and changes the request body to a JS object when the content type is application/json - middleware

app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'My friends are VERY Clever',
    caption: "Let's go skiing!",
  })
})
app.use('/friends', friendsRouter) //mounting the friendsRouter on the app object
app.use('/messages', messagesRouter)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
