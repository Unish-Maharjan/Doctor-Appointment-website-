const AuditLog = require("../models/auditLogModel");

async function recordAuditLog({ user, action, resource, resourceId, details, req }) {
  try {
    const ipAddress = req
      ? req.headers["x-forwarded-for"] || req.connection?.remoteAddress || req.ip || ""
      : "";

    // sanitize any sensitive keys from details if present
    const sanitizedDetails = details ? { ...details } : {};
    delete sanitizedDetails.password;
    delete sanitizedDetails.cardNumber;
    delete sanitizedDetails.cvv;
    delete sanitizedDetails.token;

    await AuditLog.create({
      user: user || (req && req.user ? req.user._id : undefined),
      action,
      resource,
      resourceId: resourceId ? String(resourceId) : undefined,
      details: sanitizedDetails,
      ipAddress: String(ipAddress),
    });
  } catch (err) {
    console.error("Failed to record audit log:", err.message);
  }
}

module.exports = {
  recordAuditLog,
};
