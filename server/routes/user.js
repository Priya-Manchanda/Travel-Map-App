const router = require("express").Router();
const Users = require("../models/User");
var bcrypt = require("bcryptjs");
// register
router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPasswod = await bcrypt.hash(req.body.password, salt);
    // create new user
    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hashedPasswod,
    });
    // save user and send response
    const savedUser = await newUser.save();
    res.status(200).json(savedUser._id);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Login
router.post("/login", async (req, res) => {
  try {
    // find Users
    const newUser = await Users.findOne({
      username: req.body.username,
    });
    !newUser && res.status(400).json("Wrong Username or password");

    // validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      newUser.password
    );
    !validPassword && res.status(400).json("Wrong Username or password");
    // send response
    res.status(200).json({ _id: newUser._id, username: newUser.username });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
