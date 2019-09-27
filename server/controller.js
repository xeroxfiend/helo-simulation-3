const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const {username, password} = req.body;

    const existingUserArray = await db.find_user(username);

    if (existingUserArray[0]) {
      return res
        .status(200)
        .send({message: "username already exists", loggedIn: false});
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUserId = await db
      .new_user({username, hash})
      .catch(err => res.sendStatus(503));
  }
};
