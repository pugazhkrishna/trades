
import mongoose from 'mongoose';
import moment from 'moment-timezone';
// Trades model defining here
var trades = mongoose.Schema({
    id:Number,
    type:String,
    user:{
        id:Number,
        name:String
    },
    symbol:String,
    shares:Number,
    price:Number,
    timestamp:{
       type: Date,
       default: moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss')
    }
    // timeystamp:{
    //     type: Date, 
    //     default: Date.now
    // }
}, {
    versionKey: false 
  });

var trades = mongoose.model('trades', trades);
module.exports = {
    trades
}