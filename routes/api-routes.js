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
      },
      include: [db.Rental]
    }).then(function(result) {
      res.json(result);
    });
  });

  app.put("/api/cars/:id", function(req, res) {
    console.log(req.body, req.params.id);
    db.Car.update(req.body.data, {
      where: {
        id: req.params.id
      },
      order: [["id", "DESC"]],
      returning: true,
      plain: true
    }).then(
      db.Car.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(result) {
        res.json(result);
      })
    );
  });

  app.post("/api/cars", function(req, res) {
    db.Car.create(req.body).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/rentals", function(req, res) {
    db.Rental.create(req.body).then(function(results) {
      res.json(results);
    });
  });
};
