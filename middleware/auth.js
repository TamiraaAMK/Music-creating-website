module.exports.isAuthenticated = (req, res, next) => {
    console.log('Session userId in middleware:', req.session.userId); // Debug session
    if (req.session && req.session.userId) {
        console.log('User authenticated'); // Debugging
        return next(); // User is authenticated
        
    } else {
        console.log('User not authenticated'); // Debugging
        res.redirect('/login'); // Redirect to login
    }
};
