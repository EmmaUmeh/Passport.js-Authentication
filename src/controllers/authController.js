const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.login = async (req, res, next) => {
  try {
    passport.authenticate('local', async (err, user, info) => {
      if (err) {
        console.error(err);
        throw new Error('Internal server error');
      }

      if (!user) {
        console.log(`Authentication failed: ${info.message}`);
        return res.status(401).json({ message: info.message });
      }

      // Use req.logIn without wrapping in a Promise
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          throw new Error('Internal server error');
        }

        // Successful login
       return res.json({message: 'Login Successfully', user})
      });
    })(req, res, next);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};


exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ username, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    return res.json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// module.exports = { login, register}