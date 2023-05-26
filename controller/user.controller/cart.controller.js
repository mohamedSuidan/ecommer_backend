let cartModel = require("../../model/product.model");
exports.addToCart = (req, res, next) => {
  cartModel.query(
    "SELECT * FROM `cart` WHERE product_id=?",
    [req.body.product_id],
    (err, rows) => {
      // console.log(rows[0]);
      if (!err) {
        if (rows[0] === undefined) {
          console.log("good");
          cartModel.query(
            "INSERT INTO `cart`(`user_id`, `product_id`, `amount`, `price`) VALUES (?,?,?,?)",
            [
              req.body.user_id,
              req.body.product_id,
              req.body.amount,
              req.body.price,
            ],
            (err, rows) => {
              if (!err) {
                res.json("data added");
              } else {
                console.log(err);
              }
            }
          );
        } else {
          cartModel.query(
            "UPDATE `cart` SET `amount`=?,`price`=? WHERE product_id=?",
            [
              +req.body.amount + rows[0].amount,
              +req.body.price + rows[0].price,
              req.body.product_id,
            ],
            (err, rows) => {
              if (!err) {
                console.log("updated");
              } else {
                console.log(err);
              }
            }
          );
        }
      } else {
        console.log(err);
      }
    }
  );
};
exports.getCart = (req, res, next) => {
  cartModel.query(
    "SELECT cart.id,cart.user_id, cart.product_id, cart.amount, cart.price, products.name, products.discount FROM `cart` JOIN products ON products.id = cart.product_id WHERE user_id=?",
    [req.query.id],
    (err, rows) => {
      if (!err) {
        res.json({
          cart: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
