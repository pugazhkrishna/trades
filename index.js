import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

// define our app using express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


const dotenv = require('dotenv').config()

app.use(cors());
// allow-cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(String(process.env.MONGO_URL),{ useNewUrlParser: true }); // for local external ip

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, 'public')));

import trades from '../trades/routes/trades.route';
// app.use('/trades', trades);
app.post('/trades', trades)
app.get('/trades', trades)
app.delete('/trades',trades)
app.get('/trades/users/:userId',trades)

app.get('/', (req, res) => {
    return res.end('API Connection success');
  })

// catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(process.env.PORT, () => {
    console.log(`App Server Listening at ${process.env.PORT}`);
    // console.log(moment().unix())
});  
