const express = require('express');
const { Account } = require('../db');
const authMiddleware = require('./middelware');
const { default: mongoose } = require('mongoose');
const { setErrorMap } = require('zod');
const router = express.Router()


router.get('/balance',authMiddleware,async (req,res)=>{
    const userId = req.userId
    const account = await Account.findOne({ userId:userId})
    res.json({
        balance:account.balance
    })
})

router.post('/transfer',authMiddleware,async(req,res)=>{

    const session = await mongoose.startSession()
    session.startTransaction()

    const { to , amount } = req.body

    
    const toAccount = await Account.findOne({userId:to}).session(session)
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Invalid Account"
        })
    }
    
    const frAccount = await Account.findOne({userId:req.userId}).session(session)
    console.log(amount);
    if(!frAccount || amount>frAccount.balance){
        console.log(frAccount.balance);
        await session.abortTransaction()

        return res.status(400).json({
            message:"Insufficent balance"
        })
    }

    await Account.updateOne({userId:to},{
        $inc:{balance: amount}
    }).session(session)

    await Account.updateOne({userId:req.userId},{$inc:{balance: - amount}}).session(session)
  

    
    await session.commitTransaction()
    res.json({
        message:"Transfer sucesful"
    })
})

module.exports = router