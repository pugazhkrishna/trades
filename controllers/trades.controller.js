import mongoose, { model } from 'mongoose';
import moment from 'moment';
import _ from 'underscore';

import models from '../models/trades.model'

//create trades here
export const addTrades = (req,res)=>{
    let js =JSON.parse(JSON.stringify(req.body.user))
    const trades = new models.trades(req.body);
    console.log(trades.user=js)
    models.trades.findOne({id:req.body.id},(err,data)=>{
        if(!_.isEmpty(data) > 0){ //Checking already data exists
            return res.sendStatus(400)
        }else{
            trades.save((err, data) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Trades insert error', 'error':err });
                } else {
                    return res.sendStatus(201);
                }
            })
        }
    })  
}

//get trades here
export const getTrades = (req,res)=>{
    models.trades.find().sort({ id:1}).exec((err, data) => {
        if(err) res.json({ 'success': false, 'message': 'Trades get error', 'error':err });
        return res.status(200).json(data);

    });
}

//delete all trades here
export const deleteTrades = (req,res)=>{
    models.trades.deleteMany((err,data)=>{
        if(err){
            return res.json({ 'success': false, 'message': 'Trades get error', 'error':err });
        }else{
            return res.sendStatus(200);
        }
    })
}

//Get trades based on user id and sorted by asc order
export const getTradesUserWise = (req,res)=>{  
    models.trades.find({'user.id':req.params.userId}).sort({id:1}).exec((err,data)=>{
        if(err) return res.json({ 'success': false, 'message': 'Trades get error', 'error':err });
         else{
             if(_.isEmpty(data)){
                res.sendStatus(404);
             }else{
                res.status(200).json(data);
             }
         }
    })
}


//Returning the trade records filtered by the stock symbol and trade type in the given date range
export const getTradesStock = (req,res)=>{  
    let reqParam = req.params;
    let reqQuery = req.query;
    models.trades.find({symbol:reqParam.stockSyl,type:reqQuery.type, timestamp:{$gte:new Date(reqQuery.start), $lte:new Date(reqQuery.end)}}).sort({id:1}).exec((err,data)=>{
        if(err) return res.json({ 'success': false, 'message': 'Trades get error', 'error':err });
         else{
             if(_.isEmpty(data)){
                res.sendStatus(404);
             }else{
                res.status(200).json(data);
             }
         }
    })
}