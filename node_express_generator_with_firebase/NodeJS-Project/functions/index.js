const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.set('view engine', 'ejs');
app.use(cors());
app.get("/", function(req, res, next) {
  res.render('index');
});
app.get("/test", (req, res) => {
  res.send("Hooray, it works!");
});
exports.app = functions.https.onRequest(app);
