//dependances

const express = require("express");

//establish our PORT and create the server
const PORT = process.env.PORT || 3001;
const app = express();
//
const db = require("./models");
if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));
}
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require routes
require("./routes/api-routes.js")(app);

// sync models to database
db.sequelize.sync({ force: true }).then(function() {
  //allow server to listen for requiests
  app.listen(PORT, function() {
    console.log("listening on " + PORT);
  });
});
