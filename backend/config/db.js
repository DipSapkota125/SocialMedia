const mongoose = require('mongoose');

const connectDB = () =>{
    mongoose.connect(process.env.mongo_uri,{
       
    }).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`.cyan.underline.bold);
    })
}

module.exports = connectDB