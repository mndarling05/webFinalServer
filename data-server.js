require('dotenv').config();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./scripts/routes/user')
const episodeRoutes = require('./scripts/routes/episodes')
const contestantRoutes = require('./scripts/routes/contestants')
const ratingRoutes = require('./scripts/routes/ratings')

const app = express();


/* --- MIDDLEWARE -- */

//tell node to use json and HTTP header features
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//enable cors
app.use(cors());

app.use((req, resp, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/user', userRoutes)
app.use('/api/episodes', episodeRoutes)
app.use('/api/contestants', contestantRoutes)
app.use('/api/user/ratings', ratingRoutes)

require('./scripts/handlers/mongoDataConnector').connect();

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server running at port: " + port);
})