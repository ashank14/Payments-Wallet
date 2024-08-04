const express=require("express");
const app=express();
const zod=require("zod");
const {User}=require('../db');
const {Balance}=require('../db');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config');
const {authMiddleware}=require('../middleware');
const router=express.Router();

const signupbody=zod.object({
    username: zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
})
router.post('/signup',async (req,res)=>{
    const {success}=signupbody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect input"
        })
    }
    const existinguser=await User.findOne({
        username:req.body.username
    })

    if(existinguser){
        return res.status(411).json({
            message:"Username already taken"
        })
    }

    const newuser=await User.create({
        username:req.body.username,
        password:req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    })
    const userId=newuser._id;
    await Balance.create({
        userId:userId,
        balance:(Math.floor(Math.random() * 100000) + 1) / 100
    })
    const token=jwt.sign({
        userId
    },JWT_SECRET);
    res.status(200).json({
        message:"User created Successfully",
        token:token
    })
})

const signinbody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})
router.post('/signin',async (req,res)=>{
    const {success}=signinbody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"incorrect input"
        })
    }
    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    });
    if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET);

        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        message:"Error"
    })
})

const updatebody=zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
})
router.put('/update',authMiddleware,async(req,res)=>{
    const {success}=updatebody.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message:"Error while updating details"
        })
    }

    await User.updateOne({_id:req.userId},req.body);
    res.json({
        message:"done"
    })
})

router.get("/bulk",authMiddleware,async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})
module.exports=router;