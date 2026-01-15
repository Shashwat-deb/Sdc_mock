const ADMIN_ROLES = ['SUPERVISOR', 'MANAGER', 'HR'];

// Check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
}

// Check if user is an admin (supervisor, manager, or HR)
function isAdmin(req, res, next) {
    if (req.session.userId && ADMIN_ROLES.includes(req.session.userRole)) {
        return next();
    }
    res.redirect('/dashboard');
}

module.exports = {
    isAuthenticated,
    isAdmin,
    ADMIN_ROLES
};
