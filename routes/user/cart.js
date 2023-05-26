const route = require("express").Router();
const bodyParse = require("body-parser");
const cartController = require("../../controller/user.controller/cart.controller");
const gurd = require("../gurds/gurd.user");
route.post("/cart", gurd.gurdUser, bodyParse.json(), cartController.addToCart);
route.get("/cart", gurd.gurdUser, cartController.getCart);
module.exports = route;
