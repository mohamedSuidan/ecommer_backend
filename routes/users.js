const route = require("express").Router();
const bodyParse = require("body-parser");
const gurd = require("./gurds/gurd.admin");
const userController = require("../controller/user.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
route.get("/users", gurd.gurdAdmin, bodyParse.json(), userController.getUsers);
route.get("/users/delete", gurd.gurdAdmin, userController.delUser);
route.post(
  "/users/add",
  gurd.gurdAdmin,
  bodyParse.json(),
  upload.single("img"),
  userController.addUser
);
route.get("/users/:id", gurd.gurdAdmin, userController.getUserById);
route.post(
  "/users/update",
  gurd.gurdAdmin,
  bodyParse.json(),
  userController.updateUser
);
module.exports = route;
