//dependances

const express = require("express");

//establish our PORT and create the server
const PORT = process.env.PORT || 3000;
const app = express();
//
const db = require("./models");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require routes
require("./routes/api-routes.js")(app);

// sync models to database
db.sequelize.sync().then(function() {
  //allow server to listen for requiests
  app.listen(PORT, function() {
    console.log("listening on " + PORT);
  });
});
