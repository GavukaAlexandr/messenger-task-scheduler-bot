'use strict'
var express = require('express');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// app.get('/', function(req, res){
//   res.send('hello world');
// });

app.use(express.static(__dirname + "./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(3000, err => {
    if (err) return console.log(err);
    console.log("server started");
  });
