let productModel = require("../model/product.model");
exports.getProduct = (req, res, next) => {
  productModel.query(
    `SELECT products.id,products.name, products.price, products.discount, products.amount, categories.name As category
  FROM products
  JOIN categories ON categories.id = products.category`,
    (err, rows) => {
      if (!err) {
        res.json({
          product: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
exports.deleteProduct = (req, res, next) => {
  productModel.query(
    "DELETE FROM `products` WHERE id=?",
    [req.query.id],
    (err, rows) => {
      if (!err) {
        res.json({
          msg: "deleted",
        });
      } else {
        console.log(err);
      }
    }
  );
};
exports.addProduct = (req, res, next) => {
  console.log(req.files);
  productModel.query(
    "INSERT INTO `products`(`name`, `price`, `discount`, `category`, `amount`,`description`, `main_img`) VALUES (?,?,?,?,?,?,?)",
    [
      req.body.name,
      req.body.price,
      req.body.discount,
      req.body.category,
      req.body.amount,
      req.body.description,
      req.files[0].path,
    ],
    (err, rows) => {
      if (!err) {
        for (let i = 0; i < req.files.length; i++) {
          productModel.query(
            "INSERT INTO `img`(`img`, `product_id`) VALUES (?,?)",
            [req.files[i].path, rows.insertId],
            (err, data) => {
              if (!err) {
                console.log("good");
              }
            }
          );
        }
      }
    }
  );
};
exports.updateProduct = (req, res, next) => {
  productModel.query(
    "UPDATE `products` SET `price`=?,`discount`=? `amount`=? WHERE id=?",
    [req.body.price, req.body.discount, req.body.amount, req.body.id],
    (err, rows) => {
      if (!err) {
        res.json({
          msg: "data added",
        });
      }
    }
  );
};
