//DELETE THIS LATER
require('dotenv').config();
const express = require('express');

const connector = require('./scripts/mongoDataConnector').connect();

//create an express app
const app = express();

//use express to listen to port
let port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Server running at port: " + port)
});