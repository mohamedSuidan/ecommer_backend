let jwt = require("jsonwebtoken");
let jwt_secret = "sa;ldsakd;;dk a;dk ;asldk;ajdeao";
exports.gurdSignin = (req, res, next) => {
  let token = req.header("Authorization");
  try {
    let data = jwt.verify(token, jwt_secret);
  } catch (err) {
    next();
  }
};
