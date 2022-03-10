const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const colors = require("colors");
const path = require("path");

//Config/dotenv
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({path:"backend/config/config.env"});
}
// dotenv.config({
//     path: "./config/config.env",
// });

// Handling Uncaught Exception
process.on("uncaughtException", (err) =>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
})

//connecting to database

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});




const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

//Routes
app.use('/api/v1', require('./routes/productRoute'));
app.use('/api/v1',require("./routes/userRoute"));
app.use('/api/v1',require("./routes/orderRoute"));
app.use('/api/v1',require("./routes/paymentRoute"));

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});


//middleware error
app.use(errorMiddleware);



//PORT
const PORT = process.env.PORT

const server = app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server to Unhandled promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});