let jwt = require("jsonwebtoken");
let jwt_secret = "sa;ldsakd;;dk a;dk ;asldk;ajdeao";
exports.gurdAdmin = (req, res, next) => {
  let token = req.header("Authorization");
  try {
    let data = jwt.verify(token, jwt_secret);
    if (data.isAdmin === 1) {
      next();
    } else {
      res.send("you are not admin");
    }
  } catch (err) {
    res.send("You Should Signin");
  }
};
