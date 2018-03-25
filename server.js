// server.js
// set up =======================
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const morgan = require('morgan');             // log requests to the console (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const db = require('./config/db');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

MongoClient.connect(db.url, (err, mc) => {
    if (err) return console.log(err);
    require('./routes')(app, mc.db("kpowdb"));
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
