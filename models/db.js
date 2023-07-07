const mysql = require("mysql");
const logger = require("../helpers/logger");


let obj;

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() == "dev") {
    obj = {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database: 'interview_test',
        charset: "utf8mb4"
    }
}else{
    obj = {
        connectionLimit : 300,
        host: 'sql7.freemysqlhosting.net',
        user: 'sql7631176',
        password: 'JRS1B1QkQG',
        database: 'sql7631176',
        charset: "utf8mb4"
    }
}



console.log(obj)
const db = mysql.createPool(obj);

db.getConnection((err,data) => {
    if (err) {
        logger.debug(err)
        return console.log(err)
    }
    console.log("DB CONNECTED")
    
    
})


module.exports = db