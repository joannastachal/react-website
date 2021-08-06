const express = require('express');
const cors = require("cors");
const exphbs = require('express-handlebars');
const app = express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const hostname = '127.0.0.1';
const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const root = require('path').join(__dirname, 'wallstreetbits', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.get("https://api.lightningprotocol.finance/stats", (request, response) => {
    const stats = response.body;
    console.log(stats)
})

app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

const PORT = process.env.PORT || 5000;
console.log('server started on port:',PORT);
app.listen(PORT);