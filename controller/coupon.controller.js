let couponModel = require("../model/coupon.model");
exports.getCoupon = (req, res, next) => {
  couponModel.query("SELECT * FROM coupon", (err, rows) => {
    if (!err) {
      res.json({
        coupon: rows,
      });
    }
  });
};

exports.delCoupon = (req, res, next) => {
  couponModel.query(
    "DELETE FROM `coupon` WHERE id=?",
    [req.query.id],
    (err, rows) => {
      if (!err) {
        res.json({
          msg: "deleted",
        });
      }
    }
  );
};

exports.addCoupon = (req, res, next) => {
  couponModel.query(
    "INSERT INTO `coupon`(`name`, `discount`, `expiration`) VALUES (?,?,?)",
    [req.body.name, req.body.discount, req.body.expire],
    (err, rows) => {
      if (!err) {
        res.json({
          msg: "added",
        });
      }
    }
  );
};
exports.updateCoupon = (req, res, next) => {
  couponModel.query(
    "UPDATE `coupon` SET `name`=?,`discount`=?,`expiration`=? WHERE id=?",
    [req.body.name, req.body.discount, req.body.expire, req.body.id],
    (err, rows) => {
      if (!err) {
        res.json({
          msg: "updated",
        });
      }
    }
  );
};
