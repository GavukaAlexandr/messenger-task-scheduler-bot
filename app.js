var express = require('express');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var https = require('https'); 
var fs = require('fs');

var app = express();

var httpsOptions = {
  key: fs.readFileSync('/home/cert/task-scheduler.tk/privkey.pem'),
  cert: fs.readFileSync('/home/cert/task-scheduler.tk/cert.pem'),
  ca: fs.readFileSync('/home/cert/task-scheduler.tk/chain.pem')
};

//for site
app.use(express.static(__dirname + "./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//for site

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


https.createServer(httpsOptions, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);






app.listen(3000, err => {
    if (err) return console.log(err);
    console.log("server started");
  });
