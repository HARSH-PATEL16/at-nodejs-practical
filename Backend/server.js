// NODE FRAMEWORK
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser') // TO PARSE POST REQUEST
const cors = require('cors') // ALLOW CROSS ORIGIN REQUESTS
require('dotenv').config();
require('./Database/db_connection');
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.text({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Routers
const userRoutes =  require('./Routes/user');
app.use(userRoutes)

const PORT = process.env.PORT || 3000
//server
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
