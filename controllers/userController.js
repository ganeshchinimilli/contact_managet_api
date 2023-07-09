const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Invalid email or password');
    };

    const user = await User.findOne({email: email});
    try{
        if(user && (await bcrypt.compare(password,user.password))){
            const accessToken = jwt.sign({
                    user:{
                        username: user.username,
                        email: user.email,
                        id: user.id
                    },
                },
                process.env.ACCESS_TOKEN,
                {expiresIn:"1m"}
            );
            res.status(200).json({accessToken});
        }else{
            res.status(401);
            throw new Error('Invalid email or password');
        }
    }catch(e){
        console.log(e);
    }
    
});

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    console.log(req.body);
    if(!username || !email || !password){
        res.status(400);
        throw new Error('ALl fields Are mandatory');
    }

    const userAvailable =await(User.findOne({email}));
    console.log(userAvailable);
    if(userAvailable){
        res.status(400);
        throw new Error('User already registered'); 
    };

    const hashed_pas = await bcrypt.hash(password,10);
    console.log(hashed_pas);
    try{
        const user = await User.create({username,email,password:hashed_pas,});
        if(user){
            res.status(201).json({_id:user.id,email:user.email});
        }else{
            res.status(400);
            throw new Error('User data is invalid'); 
        }
    }catch(ex){
        console.log(ex);
    }
   

});


const getUser = asyncHandler(async(req,res)=>{
    res.send(req.user);
});

module.exports = {registerUser,loginUser,getUser};