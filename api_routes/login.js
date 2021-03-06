const express = require('express');
const { User } = require('../models');
const { mongoChecker, isMongoError } = require('./helpers/mongo_helpers');

const router = express.Router();
const log = console.log;

/**
 * Create a new session to log this user in.
 * If the user is found, reroute them to the user home page with an 
 * active session, otherwise return a 404 status code.
 * 
 * Request body expects:
 * 
 * {
 *      "username": <username>
 *      "password": <password>
 * }
 */
router.post('/api/login', mongoChecker, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    log(`Log in requested for username: "${username}"`);

    try {
        const user = await User.findByUsernamePassword(username, password); 
        if (!user) {
            res.status(404).send("User not found");
        } else {
            log(`Log in successful for user [${user._id}]`);
            req.session.user = user._id; // need to put this into url parameter for each page
            req.session.username = user.username;
            req.session.isAdmin = user.isAdmin; // cookie keeps track of whether this is an admin for permission purposes
            res.status(200).send(user); 
        }
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send();
        } else {
            res.status(400).send();
        }
    }
});

/**
 * Remove existing session and log this user out.
 */
router.post('/api/logout', (req, res) => {
    log(`logging out user [${req.session.user}]`);

    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.redirect('/login');
        }
    })
})

module.exports = router;
