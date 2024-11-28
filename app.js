const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const musicRoutes = require('./routes/music');
const app = express();
const path = require('path');

require('dotenv').config();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Session setup
app.use(session({
    secret: 'yourSecretKey', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Middleware to protect routes
function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/auth/login'); // Redirect to login if not logged in
    }
    next();
}

// Use auth routes for login/register
app.use('/auth', authRoutes);

// Fix for Mongoose strictQuery warning
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use other routes
app.use('/', indexRoutes);
app.use('/music', requireLogin, musicRoutes); // Protect /music routes with login

app.post('auth/login', (req, res) => {
    const { username } = req.body;
    if (username) {
        req.session.user = username;
        res.cookie('user-preference', 'dark-mode', { maxAge: 1000 * 60 * 60, httpOnly: true });
        res.send(`Welcome, ${username}`);
    } else {
        res.status(400).send('Username is required');
    }
});

// Dashboard Route
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send(`Hello, ${req.session.user}!`);
    } else {
        res.status(401).send('Please log in to access this page');
    }
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        res.clearCookie('user-preference');
        res.send('Logged out successfully');
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
