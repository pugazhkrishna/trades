import express from 'express';

import * as tradeController from '../controllers/trades.controller';

// get an instance of express router
var router = express.Router();


router.route('/trades')
   .get(tradeController.getTrades)
   .post(tradeController.addTrades)
   .delete(tradeController.deleteTrades)

router.route('/trades/users/:userId')
    .get(tradeController.getTradesUserWise)

export default router;