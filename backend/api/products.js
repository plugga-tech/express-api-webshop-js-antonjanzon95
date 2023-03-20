var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  // hämta specific produkt - använd id på produkt för att söka specific
});

router.post("/add", function (req, res, next) {
  // skapa produkt
  // {
  //   "name": "Produkt 1",
  //   "description": "Beskrivning av produkt 1",
  //   "price": 100,
  //   "lager": 10
  // }
});

module.exports = router;
