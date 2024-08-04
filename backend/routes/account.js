const express=require('express');
const app=express();
const router=express.Router();
const {authMiddleware}=require('../middleware');
const {Balance}=require('../db');
const { default: mongoose } = require('mongoose');
router.get('/balance',authMiddleware,async (req,res)=>{
    const account=await Balance.findOne({
        userId:req.userId
    });

    res.json({
        balance:account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Balance.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Balance.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Balance.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Balance.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});
module.exports=router;