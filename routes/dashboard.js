const route = require("express").Router();
const bodyParse = require("body-parser");
const gurd = require("./gurds/gurd.admin");
const dashboardController = require("../controller/dashboard.controller.js");
route.get("/dashboard", gurd.gurdAdmin, dashboardController.getData);
route.get("/chart-data", gurd.gurdAdmin, dashboardController.chartData);
module.exports = route;
