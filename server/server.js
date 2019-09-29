require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
const ctrl = require('./controller')

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
)

//endpoints
app.post('/auth/register', ctrl.register)

app.post('/auth/login', ctrl.login)

app.get('/api/posts/:user_id', ctrl.getPosts) 

// app.get('/api/post/:post_id', ctrl.getPost)

app.post('/api/post/:user_id', ctrl.addNewPost) 


// app.put()

// app.delete()


massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Connected to database");
  app.listen(SERVER_PORT, () =>
    console.log(`and listening on port ${SERVER_PORT}!`)
  );
});
