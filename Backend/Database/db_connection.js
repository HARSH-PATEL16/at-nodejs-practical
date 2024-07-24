let mySql = require('mysql');
require('dotenv').config();


let con = mySql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

con.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Database Connected!!!!!");
    }
})

module.exports = con;