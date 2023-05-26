const route = require("express").Router();
const bodyParse = require("body-parser");
const gurd = require("./gurds/gurd.admin");
const orderController = require("../controller/order.controller");
route.get("/admin/order", gurd.gurdAdmin, orderController.getOrder);
module.exports = route;
