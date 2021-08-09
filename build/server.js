"use strict";

var express = require('express'); // Initializations


var app = express(); // Settings

app.set('port', process.env.PORT || 5000); // Middlewares
// Global Variables
// Routes
// Static Files
// Run Server

app.listen(app.get('port'), function () {
  console.log("Servidor abierto en el puerto ".concat(app.get('port')));
});