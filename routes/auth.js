const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Render login page
router.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/');  // Redirect to home page if already logged in
    }
    res.render('login');
});

// Handle login submission 
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.isPasswordValid(password)) {
        req.session.userId = user._id;  // Store user ID in session
        res.redirect('/');  // Redirect to home page after login
    } else {
        res.status(400).send("Invalid username or password");
    }
});

// Render register page
router.get('/register', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/');  // Redirect to home page if already logged in
    }
    res.render('register'); 
});

// Handle register submission
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/auth/login'); // After successful registration, redirect to login
    } catch (error) {
        res.status(500).send("Error registering new user");
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/'); // Redirect to home page after logout
    });
});

module.exports = router;
