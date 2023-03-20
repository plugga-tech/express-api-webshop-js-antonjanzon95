var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  //hämta alla users, bara id, namn och email på ALLA users.
});

router.post("/", function (req, res, next) {
  // hämta specific user || skicka ett helt objekt
  // {
  //   "id": "// EN USER ID"
  // }
});

router.post("/add", function (req, res, next) {
  // skapa en user
  // {
  //   "name": "Test Testsson",
  //   "email": "test@mail.com",
  //   "password": "test"
  // }
});

router.post("/login", function (req, res, next) {
  // logga in user
  //   {
  //     "email": "// EN USER EMAIL",
  //     "password": "// ETT USER PASSWORD"
  //   }
});

module.exports = router;
