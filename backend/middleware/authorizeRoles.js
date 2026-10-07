function authorizeRoles(...allowedRoles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: "No token provided or unauthorized" });
    }

    // Admins always have access to all endpoints
    if (req.user.role === "admin" || allowedRoles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      message: `Access denied. Role '${req.user.role}' is not authorized to perform this action.`,
    });
  };
}

module.exports = authorizeRoles;
