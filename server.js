const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db;

app.set('view engine', 'ejs');

MongoClient.connect('mongodb://vrut57:password@ds143231.mlab.com:43231/mongo-db-starter', (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, function () {
        console.log('listening on 3000');
    });
})

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, resule) => {
        if (err) return console.log(err)
        console.log('saved to database');
        res.redirect('/');
    })
})