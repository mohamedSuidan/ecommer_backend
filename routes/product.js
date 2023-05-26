const route = require("express").Router();
const bodyParse = require("body-parser");
const gurd = require("./gurds/gurd.admin");
const multer = require("multer");
const productController = require("../controller/product.controller");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
route.get("/product", gurd.gurdAdmin, productController.getProduct);
route.get("/product/delete", gurd.gurdAdmin, productController.deleteProduct);
route.post("/product/delete", gurd.gurdAdmin, productController.deleteProduct);
route.post(
  "/product/add",
  gurd.gurdAdmin,
  bodyParse.json(),
  upload.array("images"),
  productController.addProduct
);
route.post(
  "/product/update",
  gurd.gurdAdmin,
  bodyParse.json(),
  productController.updateProduct
);
module.exports = route;
