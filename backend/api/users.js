const express = require("express");
const router = express.Router();
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get("/", async function (req, res, next) {
  try {
    const users = await UserModel.find({}, { password: 0, isLoggedIn: 0 });
    res.status(200).json(users);
  } catch (err) {
    console.log("Error fetching users: ", err);
    res.status(400).json({ message: "Error fetching users." });
  }
});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post("/", async function (req, res, next) {
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log("Error fetching user: ", err);
    res.status(400).json({ message: "Error fetching user." });
  }
});

// SKAPA USER
router.post("/add", async function (req, res, next) {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Error adding user: ", err);
    res.status(400).json({ message: "Error adding user." });
  }
});

// LOGGA IN USER
router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const userInDb = await UserModel.findOne({ email }).catch(
      res.status(401).json({ message: "A user with this email does not exist" })
    );
    console.log(userInDb.password);

    // const passwordMatch = await bcrypt.compare(password, userInDb.password);

    if (password !== userInDb.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    userInDb.isLoggedIn = true;
    await userInDb.save();

    res.status(200).json(userInDb);
  } catch (err) {
    console.log("Error signing in user: ", err);
    res.status(500).json({ message: "Error signing in user." });
  }
});

module.exports = router;
