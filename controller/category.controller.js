const categoryModel = require("../model/category.model");
exports.getCategory = (req, res, next) => {
  categoryModel.query("SELECT * FROM `categories`", (err, rows) => {
    if (!err) {
      res.json({
        category: rows,
      });
    }
  });
};
exports.delCategory = (req, res, next) => {
  categoryModel.query(
    "DELETE FROM `categories` WHERE id=?",
    [req.query.id],
    (err, rows) => {
      if (!err) {
        res.json({
          msg: "data deleted",
        });
      }
    }
  );
};
exports.addCategory = (req, res, next) => {
  categoryModel.query(
    "INSERT INTO `categories`(`name`) VALUES (?)",
    [req.body.name],
    (err, rows) => {
      if (!err) {
        res.json({
          msg: "data added",
        });
      }
    }
  );
};
exports.updateCategory = (req, res, next) => {
  // console.log(req.body);
  categoryModel.query(
    "UPDATE `categories` SET `name`=? WHERE id=?",
    [req.body.name, req.body.id],
    (err, rows) => {
      if (!err) {
        res.json({
          msg: "data updated",
        });
      } else {
        console.log(err);
      }
    }
  );
};
