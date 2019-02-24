import _ from 'underscore';

import models from '../models/trades.model'

//create trades here
export const addTrades = (req,res)=>{

    const check = JSON.parse(req.body.user)
    let obj = {
        type:req.body.type,
        user:check,
        symbol:req.body.symbol,
        shares:req.body.shares,
        price:req.body.price,
        id:req.body.id
    }
    if(obj.shares >=10 & obj.shares <=30 & obj.price >=130.42 & obj.price <=195.65){
        const trades = new models.trades(obj);
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
    }else{
        return res.json({'message':'shares or price invalid range. valid range are shares = 10 - 30, price = 130.42 - 195.65'})
    }
    
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

//Returning highest and lowest price for the stock symbol
export const getStock = (req,res)=>{  
    let reqParam = req.params;
    let reqQuery = req.query;

    models.trades.aggregate([
        {$match:{symbol:reqParam.stockSyl, timestamp:{$gte:new Date(reqQuery.start), $lte:new Date(reqQuery.end)}}},
        {$group:{_id:"$symbol", highest:{$max:"$price"}, lowest:{$min:"$price"}}},
        {$sort:{_id:1}}
    ]).allowDiskUse(true).exec((err,data)=>{
    if(err) return res.json({ 'success': false, 'message': 'Trades get error', 'error':err });
            else{
                if(_.isEmpty(data)){
                    res.json({ "message":"There are no trades in the given date range"});
                }else{
                    res.status(200).json(data);
                    
                }
            }
        })
      
}