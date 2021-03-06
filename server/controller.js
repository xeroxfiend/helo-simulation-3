const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const {username, password} = req.body;

    const existingUserArray = await db.find_user(username);

    if (existingUserArray[0]) {
      return res.sendStatus(404);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUserArray = await db
      .new_user({
        username,
        pic: `https://robohash.org/${username}?set=set5`,
        hash
      })
      .catch(err => res.sendStatus(503));

    req.session.user = {
      username,
      pic: `https://robohash.org/${username}?set=set5`,
      userId: newUserArray[0].user_id
    };

    res.status(200).send({
      message: "Successfully registered!",
      user: req.session.user,
      loggedIn: true
    });
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const {username, password} = req.body;

    const existingUserArray = await db.find_user(username);

    if (!existingUserArray[0]) return res.sendStatus(404);

    const result = bcrypt.compareSync(password, existingUserArray[0].hash);

    if (!result) return res.sendStatus(403);

    req.session.user = {
      username,
      pic: `https://robohash.org/${username}?set=set5`,
      userId: existingUserArray[0].user_id
    };

    res.status(200).send({
      message: "Successfully logged in!",
      user: req.session.user,
      loggedIn: true
    });
  },

  logout: (req, res) => {
    req.session.destroy()
    res.status(200).send('logged out!')
  },

  getUserData: (req, res) => {
    const db = req.app.get('db')

    console.log(req.session.user.username)
    db.find_user(req.session.user.username).then(result => {
      res.status(200).send(result)
    })
  },

  getPosts: (req, res) => {
    const db = req.app.get("db");
    const {user_id} = req.session.user;
    const {search} = req.query;
    const userPosts = parseInt(req.query.userPosts);

    if (userPosts && search) {
      return db.get_all_by_title(`%${search}%`).then(result => {
        res.status(200).send(result);
      });
    }

    if (!userPosts && !search) {
      return db.get_all_no_user(user_id).then(result => {
        res.status(200).send(result);
      });
    }

    if (!userPosts && search) {
      db.get_all_by_title_no_user([user_id, `%${search}%`]).then(result => {
        res.status(200).send(result);
      });
    }

    if (userPosts && !search) {
      db.get_all().then(result => {
        res.status(200).send(result);
      });
    }
  },

  getPost: (req, res) => {
    const db = req.app.get("db");
    const {post_id} = req.params;

    db.get_post(post_id).then(result => {
      res.status(200).send(result);
    });
  },

  addNewPost: (req, res) => {
    const db = req.app.get("db");
    const {user_id} = req.params;
    const {title, url, content} = req.body;

    db.add_new_post({user_id, title, image: url, content}).then(result => {
      res.status(200).send(result);
    });
  }
};
