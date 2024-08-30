const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const route = require('./route/user')
const router = require('./route/post');
app.use(express.json());
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Mongoose is connected"))
.catch(err => console.log("error", err))
app.use(route) 
app.use(router)


 
 

app.listen(port, () => { 
    console.log("app is running");
}) 




