module.exports.isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next(); // If user is authenticated, proceed to the next route handler
    } else {
        res.redirect('/login'); // Redirect to login if not authenticated
    }
};
