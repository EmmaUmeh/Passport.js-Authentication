const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log(`User with username '${username}' not found`);
            return cb(null, 0, { message: 'Incorrect username.' });
        }

        if (!user.validPassword(password)) {
            console.log(`Incorrect password for user '${username}'`);
            return cb(null, 0, { message: 'Incorrect password.' });
        }

        console.log(`User '${username}' authenticated successfully`);
        return cb(null, user);
    } catch (error) {
        console.error(`Error during authentication: ${error.message}`);
        return cb(error);
    }
}));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findById(id);
        cb(null, user);
    } catch (error) {
        cb(error, null);
    }
});

module.exports = passport;
