var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");

var app = express();

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbUrl = path.resolve(__dirname, 'db.json');
const getDb = () => JSON.parse(fs.readFileSync(dbUrl));

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get(
    '/data',
    (req, res) => {
    const data = getDb();
    res.send(
        data.map(d => ({
            ...d,
            dateLastDrink: d.dateLastDrink ? d.dateLastDrink : new Date().toString()
        }))
    );
});

app.post(
    '/data',
    (req, res) => {
        const { name, date } = req.body;
        const data = getDb();
        const updatedData = data.map(d => {
            if (d.name === name) {
                return {
                    ...d,
                    dateLastDrink: date,
                };
            }
            return d;
        });

        const writeableData = JSON.stringify(updatedData);
        fs.writeFile(dbUrl, writeableData, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.", err);
                res.status(500).send('Failed to write to db.');
            } else {
                console.log("Saved update to db.");
                res.status(200).send('Saved data.');
            }
        });
    }
)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
