// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Port
var PORT = process.env.PORT || 3000;

// Express and router
var app = express();
var router = express.Router();

// Routes
require("./config/routes")(router);
// require("./config/api")(router);
// require("./config/view")(router);


// Designate our public folder as a static directory
app.use(express.static("./public"));

// Connect Handlebars to Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

// Mongoose 
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});


// Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
  });