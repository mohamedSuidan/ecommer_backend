let jwt = require("jsonwebtoken");
let jwt_secret = "sa;ldsakd;;dk a;dk ;asldk;ajdeao";
exports.gurdUser = (req, res, next) => {
  let token = req.header("Authorization");
  try {
    let data = jwt.verify(token, jwt_secret);
    if (data) {
      next();
    } else {
      res.send("you are not user");
    }
  } catch (err) {
    res.send("You Should Signin");
  }
};
exports.gurdSignup = (req, res, next) => {
  let token = req.header("Authorization");
  try {
    let data = jwt.verify(token, jwt_secret);
    if (data) {
      res.send("you have signed in website");
    }
  } catch (err) {
    next();
  }
};
