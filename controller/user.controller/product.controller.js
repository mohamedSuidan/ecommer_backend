let productModel = require("../../model/product.model");
exports.getProduct = (req, res, next) => {
  productModel.query(
    `SELECT products.id,products.name, products.main_img,products.price, products.discount, products.amount, categories.name As category
    FROM products
    JOIN categories ON categories.id = products.category`,
    (err, rows) => {
      if (!err) {
        res.json({
          product: rows,
        });
      }
    }
  );
};
exports.getByIdProduct = (req, res, next) => {
  productModel.query(
    "SELECT * FROM `products` WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        productModel.query(
          "SELECT * FROM `img` WHERE product_id=?",
          [req.params.id],
          (err, img) => {
            if (!err) {
              res.json({
                product: rows,
                img: img,
              });
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
};
