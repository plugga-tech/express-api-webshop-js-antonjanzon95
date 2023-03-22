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
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

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
    const userInDb = await UserModel.findOne({ email });

    if (!userInDb) {
      return res
        .status(401)
        .json({ message: "A user with this email does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userInDb.password);

    if (!passwordMatch) {
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
