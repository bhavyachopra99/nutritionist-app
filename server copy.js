const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');
const mysql = require('mysql');

app.use(express.json());



//importing static files
app.get('/style', function(req, res) {
    res.sendFile(path.join(__dirname, '/frontend/common','STYLE.css'));
});
app.get('/bmi', function(req, res) {
    res.sendFile(path.join(__dirname, '/frontend/common','bmi.js'));
});
app.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname, '/frontend/common','main.js'));
});
app.get('/homephoto', function(req, res) {
    res.sendFile(path.join(__dirname, '/images/','home.png'));
});
app.get('/logo', function(req, res) {
    res.sendFile(path.join(__dirname, '/images/','black-logo.png'));
});

const post = [
    {
        username : 'bhavya1',
        title : 'sample1'
    },
    {
        username : 'bhavya2',
        title : 'sample2'
    },
    {
        username : 'bhavya3',
        title : 'sample3'
    }
]

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '/frontend/common/login.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '/frontend/common/index.html'));
});


app.post('/', (req,res) => {
    //authenticate user
    const username = req.body.username;
})

app.listen(3000)
