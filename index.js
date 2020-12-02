require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/api/history', require('./api/route'))

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD


const url = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.nine7.mongodb.net/weatherAPI?retryWrites=true&w=majority`

const PORT = process.env.DB_PORT || 4444
app.listen(PORT, ()=>{
    console.log(`APP is Running on PORT ${PORT}`);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
        console.log('Database Connected');
    });
})
