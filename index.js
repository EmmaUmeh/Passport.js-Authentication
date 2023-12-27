const express = require('express');
const authController = require('./src/controllers/authController');
const connectDB = require('./src/config/database-config');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add the following lines for session middleware
app.use(
  session({
    secret: `${process.env.SECRET_KEY}`, // Change this to a secure key
    resave: false,
    saveUninitialized: false,
  })
);

// Connect to MongoDB
connectDB();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post('/login', authController.login);
app.post('/register', authController.register);

require('./src/config/passport-config');

// Start the server
const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
