const express = require('express');
const { User, Account }= require('../db')
const router = express.Router()
const jwt = require('jsonwebtoken')
router.get('/',(req,res)=>{
    res.json({
        msg:"hi there"
    })
})


const z = require('zod');
const JWT_SECRET = require('../config');
const authMiddleware = require('./middelware');

const signUp = z.object({
    userName:z.string().email(),
    firstName: z.string(),
	lastName: z.string(),
	password: z.string(),
})

router.post("/signup", async (req,res)=>{
    const payload = req.body;
    try {
        signUp.parse(payload)
        
        
        const userExits = await User.findOne({
            userName:payload.userName
        })
        if(userExits){
            throw new Error
        }

        const user= await User.create(payload)
    
        const userId = user._id
        const token = jwt.sign({userId},JWT_SECRET)

        await Account.create({
            userId,
            
            balance: 1+ Math.floor(Math.random()*10000)
        })
        
    
        res.status(200).json({
            
                message: "User created successfully",
                token: token
            
        })

      

        
    } catch (error) {
        console.log(error);
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
        
    }
})

const signIn = z.object({
    userName:z.string().email(),
    password:z.string()
})


router.post('/signin',async (req,res)=>{

   
    try{
        signIn.parse(req.body)
        
        const Existing = await User.findOne(req.body)
         if(!Existing){
           throw new Error
        }

        const userId= Existing._id
        const token = jwt.sign({userId},JWT_SECRET)
        res.status(200).json({
            token:token
        })
    

    }
    catch(e){
        return res.status(411).json({
            message: "Error while logging in"
        })

    }
    

    
})

//code over 

const update = z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})

router.put('/',authMiddleware,async(req,res)=>{
    try {

        update.parse(req.body)
        const userId= req.userId

        await User.updateOne({_id:userId},req.body)

        
        return res.status(200).json({
            message: "Updated successfully"
        })
        
    } catch (error) {
        return res.status(411).json(
            {
                message: "Error while updating information"
            }
        )
        
    }
})

router.get('/bulk',authMiddleware,async (req,res)=>{
    const filter = req.query.filter ||""
    const Users = await User.find({
        $or:[
            {firstName:{
                $regex:filter
            }},
            {
                lastName:{
                    $regex:filter
                }
            }
        ]
    })

    res.status(200).json({
        users:Users.map(user=>({
            userName:user.userName ,
            firstName:user.firstName,
            lastName:user.lastName,
            _Id:user._id

        }))
    })

})



module.exports=router