const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');
const mysql = require('mysql');
const LogInCollection = require("./mongo")
const port = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.json());
const tempelatePath = path.join(__dirname, './tempelates')
const publicPath = path.join(__dirname, './public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))

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


app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '/frontend/common/index.html'));
});

app.get('/signup', (req, res) => {
    res.render('signup')
});

app.get('/', (req, res) => {
    res.render('login')
});

app.post('/signup', async (req, res) => {

    const {name,password} = req.body;
    if (!name || !password) return res.status(400).json({'message' : 'Username or pass missing'});
    const check = await LogInCollection.findOne({ 'name': name }).exec();
    if(check){
    if(check.password === password) return res.status(400).json({ 'message' : 'duplicate  details'});};
   try{
    const result = await LogInCollection.create({
        "name":name,
        "password":password
    });
    
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.name
    })
});


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name }).exec();
        console.log(check);

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.name},you used pass ${req.body.password}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


});


app.listen(3000)

