const express = require('express');
const app = express();
const passport = require('passport')
const cors = require("cors");
const methodOverride = require('method-override')
const mongoose = require('mongoose');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(methodOverride('_method'))

require('./passport');

app.use(passport.initialize())
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'twitter',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to Mongo database'));

var authRout = require('./routes/auth')
app.use('/auth', authRout)

app.get("/", (req, resp) => {
    resp.send("App is Working");
});


app.listen(5001,()=>{
    console.log("Login Server Started")
})