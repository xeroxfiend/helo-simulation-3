require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
const ctrl = require('./controller')

const {SERVER_PORT, SESSION_SERCRET, CONNECTION_STRING} = process.env;

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SERCRET,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
)

//endpoints

// app.get()

// app.post()

// app.put()

// app.delete()


massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Connected to database");
  app.listen(SERVER_PORT, () =>
    console.log(`and listening on port ${SERVER_PORT}!`)
  );
});
