var express = require("express");
var app = express();
app.use(express.static(__dirname+"/sample2"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/homepage.html");
});
app.get("/loginpage.html", (req, res) => {
  res.sendFile(__dirname + "/loginpage.html");
});
app.get("/GameStore.html", (req, res) => {
  res.sendFile(__dirname + "/GameStore.html");
});
app.listen(5000);
console.log("@5000");