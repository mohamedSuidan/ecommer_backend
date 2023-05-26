const userModel = require("../model/admin.model");
let bycrpt = require("bcrypt");
exports.getUsers = (req, res, next) => {
  userModel.query("SELECT * FROM `users` WHERE is_admin!=1", (err, data) => {
    if (!err) {
      res.json({
        user: data,
      });
    } else {
      res.json("not found users");
    }
  });
};

exports.delUser = (req, res, next) => {
  userModel.query(
    "DELETE FROM `users` WHERE id=?",
    [req.query.id],
    (err, data) => {
      if (!err) {
        res.json("Deleted");
      }
    }
  );
};
exports.addUser = async (req, res, next) => {
  let hash = await bycrpt.hash(req.body.password, 10);
  userModel.query(
    "INSERT INTO `users`(`name`, `email`, `password`, `img`) VALUES (?,?,?,?)",
    [req.body.name, req.body.email, hash, req.file.path],
    (err, files) => {
      if (!err) {
        res.json("Data Added");
      } else {
        console.log(err);
      }
    }
  );
};
exports.getUserById = (req, res, next) => {
  userModel.query(
    "SELECT * FROM `users` WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.json({
          userById: rows,
        });
      }
    }
  );
};

exports.updateUser = async (req, res, next) => {
  let hash = await bycrpt.hash(req.body.password, 10);
  console.log(hash);
  console.log(req.body);
  userModel.query(
    "UPDATE `users` SET `name`=?,`email`=?,`password`=? WHERE id=?",
    [req.body.name, req.body.email, hash, req.body.id],
    (err, rows) => {
      if (!err) {
        res.json("Data Updated");
      }
    }
  );
};
