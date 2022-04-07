const db = require("../db");

module.exports = {
  logRequests: (req, res, next) => {
    console.log("Passed middleware log requests");
    db.run(
      "INSERT INTO history_requests (method, url, params) VALUES (?, ?, ?)",
      [req.method, req.originalUrl, req.params /* TODO: Use params or query */]
    );

    next();
  },
  getAll: (req, res, next) => {
    db.all(
      "SELECT * FROM history_requests",
      function (err, row) {
        if (err) {
          return next(err);
        }

        res.json(row)
      }
    )
  },
};
