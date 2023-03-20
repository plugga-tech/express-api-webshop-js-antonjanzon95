var express = require("express");
var router = express.Router();

router.get("/all", function (req, res, next) {
  // hämta alla orders
});

router.post("/add", function (req, res, next) {
  // skapa order för en specific user.
  // products är en array motsvarande innehållet i kundvagnen
  // {
  //   "user": "{{getUsers.response.body.$[0].id}}",
  //       "products": [
  //     {
  //       "productId": "// ID PÅ EN PRODUKT",
  //       "quantity": 1
  //     },
  //     {
  //       "productId": "// ID PÅ EN PRODUKT",
  //       "quantity": 2
  //     }
  //   ]
  // }
});

module.exports = router;
