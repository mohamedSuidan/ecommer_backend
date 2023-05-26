let bycrpt = require("bcrypt");
let authModel = require("../model/auth.model");
let jwt = require("jsonwebtoken");
let jwt_secret = "sa;ldsakd;;dk a;dk ;asldk;ajdeao";
exports.signin = async (req, res, next) => {
  authModel.query(
    "SELECT * FROM `users` WHERE email=?",
    [req.body.email],
    async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length === 0) {
          res.send("not found this email");
        } else {
          let bool = await bycrpt.compare(req.body.password, data[0].password);
          if (!bool) {
            res.send("You Have a Mistake in Password");
          } else {
            let token = jwt.sign(
              {
                id: data[0].id,
                name: data[0].name,
                email: data[0].email,
                isAdmin: data[0].is_admin,
              },
              jwt_secret
            );
            res.json({
              token: token,
              id: data[0].id,
              name: data[0].name,
              isAdmin: data[0].is_admin,
            });
          }
        }
      }
    }
  );
};
exports.signup = async (req, res, next) => {
  let hash = await bycrpt.hash(req.body.password, 10);
  let currentDate = new Date();

  authModel.query(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    (err, rows) => {
      if (rows[0] === undefined) {
        authModel.query(
          "INSERT INTO `users`(`name`, `email`, `password`, `img`, `month`) VALUES (?,?,?,?,?)",
          [req.body.name, req.body.email, hash, "", currentDate],
          (err, files) => {
            if (!err) {
              res.json("Data Added");
            } else {
              console.log(err);
            }
          }
        );
      } else {
        res.send("This Email Had Acount");
      }
    }
  );
  console.log("good");
};
