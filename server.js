require('dotenv').config();

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");


var request = require("request");
var rp = request("request-promise");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static("public"));


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var routes = require("./controllers/scraper_controller.js");

app.use("/", routes);

var MONGODB_URI = process.env.MONGODB_URI || 


mongoose.connect(MONGODB_URI);

var db = mongoose.connection;


db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});


db.once("open", function() {
  console.log("Mongoose connection successful.");
});


app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});