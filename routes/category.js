const route = require("express").Router();
const bodyParse = require("body-parser");
const gurd = require("./gurds/gurd.admin");
const categoryController = require("../controller/category.controller");

route.get("/category", gurd.gurdAdmin, categoryController.getCategory);
route.get("/category/delete", gurd.gurdAdmin, categoryController.delCategory);
route.post(
  "/category/add",
  gurd.gurdAdmin,
  bodyParse.json(),
  categoryController.addCategory
);
route.post(
  "/category/update",
  gurd.gurdAdmin,
  bodyParse.json(),
  categoryController.updateCategory
);
module.exports = route;
