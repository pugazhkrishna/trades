import mongoose, { model } from 'mongoose';
import moment from 'moment';
import _ from 'underscore';

import models from '../models/trades.model'

//create trades here
export const addTrades = (req,res)=>{
    const trades = new models.trades(req.body);
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
    console.log(req.params.userId)
    models.trades.find({"user.id":req.params.userId}).sort({id:1}).exec((err,data)=>{
        if(err) return res.sendStatus(404);
        res.status(200).json(data);
    })
}
