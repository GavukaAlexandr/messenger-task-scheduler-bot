import express from "express";
import bodyParser from "body-parser";
import path from "path";
import https from "https";
import fs from "fs";
import forceSsl from "express-force-ssl";
import addApiRoutes from "./src/addApiRoutes";
import mongodbConnection from "./src/database/mongodb";


const app = express();
app.use(forceSsl);

const httpsOptions = {
  key: fs.readFileSync(path.resolve("./certs/privkey1.pem")),
  cert: fs.readFileSync(path.resolve("./certs/cert1.pem")),
  ca: fs.readFileSync(path.resolve("./certs/chain1.pem"))
};

app.use(express.static(__dirname + "./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

addApiRoutes(app);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

mongodbConnection.once("open", () => {
  console.log("Mongodb server connected.");

  app.listen(3000, "0.0.0.0", err => {
    if (err) return console.log(err);
    console.log("HTTP server started");
  });
  https.createServer(httpsOptions, app).listen(8000, "0.0.0.0", err => {
    if (err) return console.log(err);
    console.log("HTTPS server started");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
