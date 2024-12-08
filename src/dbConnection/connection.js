const mongoose = require('mongoose');
require('dotenv').config();


const URI =`mongodb+srv://naty:${process .env.PASSWORD}@cluster0.z0pck.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`

const connection = ()=> {
    mongoose.connect(URI, {               
    })}

module.exports = connection;

