const express=require('express')
const mongoose=require("mongoose");

const authRoutes=require("./routes/auth")
const todoRoutes=require("./routes/todo")
const cors=require("cors")
const connectDB = require('./db/db');
const stockRoutes = require('./routes/stocks');
const portfolioRoutes = require('./routes/portfolio');
const { initWebSocket } = require('./utils/websocket');
require('dotenv').config();

connectDB();
const passport = require('passport');
const session = require('express-session');


const app=express();

// app.use(cors({
//     origin: '*', // Allow all origins (use with caution)
//   }));

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow 'Authorization' header
    credentials: true, // If you want to allow cookies to be sent
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth",authRoutes);
app.use("/todo",todoRoutes);

const port=5000;


const dotenv = require('dotenv');
dotenv.config();



// Session middleware
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB

app.use('/api/stocks', stockRoutes);
app.use('/api/portfolio', portfolioRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

initWebSocket(server);
