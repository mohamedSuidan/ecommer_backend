const dashboardModel = require("../model/admin.model");
exports.getData = (req, res, next) => {
  dashboardModel.query(
    "SELECT table_name, table_rows FROM information_schema.tables WHERE table_schema = 'ecommerce' AND table_name NOT IN ('img') ORDER BY TABLE_NAME DESC",
    (err, rows) => {
      if (!err) {
        res.json({
          count: rows,
        });
      }
    }
  );
};
let userCount = [];
let month = [];
exports.chartData = (req, res, next) => {
  dashboardModel.query(
    "SELECT COUNT(name) AS user_count , DATE_FORMAT(month, '%M') AS month FROM `users` GROUP BY MONTH(month)",
    (err, rows) => {
      if (!err) {
        rows.forEach((ele) => {
          userCount.push(ele.user_count);
          month.push(ele.month);
        });
        res.json({
          month: month,
          userCount: userCount,
        });
        month = [];
        userCount = [];
      }
    }
  );
};
