const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please add the User Name'],
    },
    email:{
        type:String,
        required:[true,'Please add the User Name'],
        unique:[true,'Email addresss already taken'],
    },
    password:{
        type:String,
        required:[true,'Please add the User Password'], 
    },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model('User',userSchema);