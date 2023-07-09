const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectdb = require('./config/dbConnection');
connectdb();
const port =process.env.PORT ||5000;
app.use(express.json());
app.use('/api/contacts',require("./routes/contactRoutes"));
app.use('/api/users',require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});