const route = require("express").Router();
const bodyParse = require("body-parser");
const authController = require("../controller/auth.controller");
const gurd = require("./gurds/gurd.route");
route.post("/signin", gurd.gurdSignin, bodyParse.json(), authController.signin);

module.exports = route;
