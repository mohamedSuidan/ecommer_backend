const route = require("express").Router();
const bodyParse = require("body-parser");
const gurd = require("../gurds/gurd.user");
const orderController = require("../../controller/user.controller/order.controller");
route.post("/order", gurd.gurdUser, bodyParse.json(), orderController.addOrder);
route.get("/order", gurd.gurdUser, bodyParse.json(), orderController.getOrder);
module.exports = route;
