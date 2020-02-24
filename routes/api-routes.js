const db = require("../models");
module.exports = function(app) {
  app.get("/api/cars", function(req, res) {
    db.Car.findAll().then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/cars/:id", function(req, res) {
    db.Car.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/cars", function(req, res) {
    db.Car.create(req.body).then(function(results) {
      res.json(results);
    });
  });
};
