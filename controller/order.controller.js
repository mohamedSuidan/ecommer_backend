let orderModel = require("../model/coupon.model");

exports.getOrder = (req, res, next) => {
  orderModel.query(
    "SELECT `order`.`user_id`, `order`.product_id, `order`.`status`, `order`.`adderss`, `order`.`price`, `order`.`amount`, `order`.`coupon`, users.name, users.email, products.name AS product FROM `order` JOIN products ON products.id = `order`.`product_id` JOIN users ON `order`.`user_id` = users.id",
    (err, rows) => {
      if (!err) {
        res.json({
          order: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
