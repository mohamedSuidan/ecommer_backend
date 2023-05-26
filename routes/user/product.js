const route = require("express").Router();
const bodyParse = require("body-parser");
const productController = require("../../controller/user.controller/product.controller");
const gurd = require("../gurds/gurd.user");
route.get("/user/product", productController.getProduct);
route.get("/user/product/:id", productController.getByIdProduct);
module.exports = route;
