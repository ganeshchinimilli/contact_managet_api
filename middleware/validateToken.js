const asyncHandler = require("express-async-handler");

const jwt=  require('jsonwebtoken');
const vaildateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader= req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer "))
    {
        token = await authHeader.split(" ")[1];
        jwt.verify(token,proess.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            };
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(403);
            throw new Error("User is not authorized");
        }
    }

});
module.exports = vaildateToken;
