var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");

var app = express();

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
