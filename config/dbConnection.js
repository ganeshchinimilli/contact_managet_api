const mongoose = require('mongoose');

const connectdb  =async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION);
        console.log(connect.connection.host);
    }catch(err){
        console.log(err);
    }
}

module.exports = connectdb;