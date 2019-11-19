var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
require('./domain/relations');
var runCursor = require('./domain/models/run/run');
var routeCursor = require('./domain/models/route/route');

routeCursor.sync().then(() => {
    runCursor.sync();
});

var app = express();

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.get('/runs/:userId', (req, res) => {
    runCursor.findAll(req.params.userId).then(runs => {
        res.send(runs);
    }).catch(error => {
        console.error('couldn\'t get runs', error);
        res.status(500).send('couldn\'t get runs');
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
