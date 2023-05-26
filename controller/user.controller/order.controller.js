const orderModel = require("../../model/order.model");
exports.addOrder = (req, res, next) => {
  console.log(req.body);
  req.body.id.forEach((ele) => {
    orderModel.query("SELECT * FROM `cart` WHERE id=?", [ele], (err, rows) => {
      if (!err) {
        orderModel.query(
          "SELECT * FROM coupon WHERE name=?",
          [req.body.coupon],
          (err, coupon) => {
            if (!err) {
              if (coupon[0] === undefined) {
                rows.forEach((ele, i) => {
                  orderModel.query(
                    "INSERT INTO `order`(`user_id`, `product_id`, `price`, `amount`, `adderss`, `coupon`, `status`) VALUES (?,?,?,?,?,?,?)",
                    [
                      ele.user_id,
                      ele.product_id,
                      ele.price - (ele.price * req.body.discount[i]) / 100,
                      ele.amount,
                      req.body.address,
                      "",
                      "pending",
                    ],
                    (err, rows) => {
                      if (err) {
                        console.log(err);
                      } else {
                        req.body.id.forEach((ele) => {
                          orderModel.query(
                            "DELETE FROM `cart` WHERE id=?",
                            [ele],
                            (err, rows) => {
                              if (!err) {
                              } else {
                                console.log(err);
                              }
                            }
                          );
                        });
                      }
                    }
                  );
                });
              } else {
                rows.forEach((ele) => {
                  orderModel.query(
                    "INSERT INTO `order`(`user_id`, `product_id`, `price`, `amount`, `adderss`, `coupon`, `status`) VALUES (?,?,?,?,?,?,?)",
                    [
                      ele.user_id,
                      ele.product_id,
                      ele.price,
                      ele.amount,
                      req.body.address,
                      req.body.coupon,
                      "pending",
                    ],
                    (err, rows) => {
                      if (err) {
                        console.log(err);
                      } else {
                        req.body.id.forEach((ele) => {
                          orderModel.query(
                            "DELETE FROM `cart` WHERE id=?",
                            [ele],
                            (err, rows) => {
                              if (!err) {
                              } else {
                                console.log(err);
                              }
                            }
                          );
                        });
                      }
                    }
                  );
                });
              }
            }
          }
        );
      }
    });
  });
};
exports.getOrder = (req, res, next) => {
  orderModel.query(
    "SELECT `order`.amount, products.discount, order.price, products.name, order.adderss, order.status FROM `order` JOIN products ON products.id = `order`.`product_id` WHERE user_id=?",
    [req.query.id],
    (err, rows) => {
      if (!err) {
        res.json({
          orders: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
