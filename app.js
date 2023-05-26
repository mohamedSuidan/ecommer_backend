const express = require("express");
const app = express();
const auth = require("./routes/auth");
const users = require("./routes/users");
const category = require("./routes/category");
const product = require("./routes/product");
const coupon = require("./routes/coupon");
const dashboard = require("./routes/dashboard");
const userProduct = require("./routes/user/product");
const order = require("./routes/user/order");
const signup = require("./routes/user/signup");
const cart = require("./routes/user/cart");
const adminOrder = require("./routes/orders");
const mysql = require("mysql");
const cors = require("cors");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(4000, () => console.log("server listen"));
  }
});
app.use(cors());
app.use(auth);
app.use(users);
app.use(category);
app.use(product);
app.use(coupon);
app.use(dashboard);
app.use(userProduct);
app.use(cart);
app.use(order);
app.use(adminOrder);
app.use(signup);
app.use("/public", express.static("public"));
