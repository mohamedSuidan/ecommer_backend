const route = require("express").Router();
const bodyParse = require("body-parser");
const gurd = require("./gurds/gurd.admin");
const couponController = require("../controller/coupon.controller");

route.get("/coupon", gurd.gurdAdmin, couponController.getCoupon);
route.get("/coupon/delete", gurd.gurdAdmin, couponController.delCoupon);
route.post(
  "/coupon/add",
  gurd.gurdAdmin,
  bodyParse.json(),
  couponController.addCoupon
);
route.post(
  "/coupon/update",
  gurd.gurdAdmin,
  bodyParse.json(),
  couponController.updateCoupon
);
module.exports = route;
