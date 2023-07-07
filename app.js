const express = require('express');
const cors = require("cors");
const hpp = require("hpp");
const path = require('path');
const logger = require("./helpers/logger");
const generalRoute = require("./routes/general/general");
const errorMiddleWare = require("./middleware/errorMiddleware");


try {

global.__basedir = __dirname;

//Require ENV
require("dotenv").config()


const app = express();

//Cors
app.use(cors({origin:"*",credentials:true}))


//Hpp Security
app.use(hpp())

  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join('public')));


//Routes


//GENERAL ROUTE
app.use("/", generalRoute)

//Error Middleware
app.use(errorMiddleWare)


app.listen(process.env.PORT || 1000 ,()=>console.log("Started On Port:1000")) 
  

process.on('uncaughtException', function (err) {
  logger.debug(err)
});

process.on('unhandledRejection', (reason, promise) => {
  logger.debug(reason)
})




  
} catch (error) {
  logger.debug(error)
}