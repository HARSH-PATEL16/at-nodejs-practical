const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
require('dotenv').config();
require('./Database/db_connection');

// Middleware
app.use(cors());
app.use(express.json());

// Routers
const userRoutes =  require('./Routes/user');
app.use(userRoutes);

const PORT = process.env.PORT || 3000
// Server
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});
