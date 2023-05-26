const route = require("express").Router();
const bodyParse = require("body-parser");
const gurd = require("../gurds/gurd.user");
const signupController = require("../../controller/auth.controller");
route.post(
  "/signup",
  gurd.gurdSignup,
  bodyParse.json(),
  signupController.signup
);
module.exports = route;
