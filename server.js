var http = require("http");
var fs = require("fs");

var mime = require("mime");

var express = require("express");

var serviceMails = require(__dirname + "/get-mails.js");

// middlewares
var logger = require("morgan");
var serveStatic = require("serve-static");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");

var PORT = 80;

serviceMails.genererMails();

var app = express();

app.use(favicon(__dirname + "/app/favicon.ico"));
app.use(logger(":method :url"));
app.use(serveStatic(__dirname + "/app"));

// API

var api = express();

// Récupérer la liste des dossiers
// GET /api/dossiers
api.get("/dossiers", serviceMails.getDossiers);

// Récupérer un dossier
// GET /api/dossiers/idDossier
api.get("/dossiers/:idDossier", serviceMails.getDossier);

// Récupérer un mail
// GET /api/dossiers/idDossier/idMail
api.get("/dossiers/:idDossier/:idMail", serviceMails.getMail);

app.use(bodyParser.json());

// Envoyer un mail
// POST /api/envoi
api.post("/envoi", serviceMails.envoiMail);

app.use("/api", api);

http.createServer(app).listen(PORT);

console.log("Serveur démarré sur le port " + PORT);