const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
    const startMs = Date.now();

    // Avoid noisy logs for preflight requests unless debugging
    const shouldLog = req.method !== "OPTIONS";

    res.on("finish", () => {
        if (!shouldLog) return;

        const durationMs = Date.now() - startMs;
        const statusCode = res.statusCode;

        // Prefer forwarded-for if present (behind proxies/load balancers)
        const forwardedFor = req.headers["x-forwarded-for"];
        const ip = Array.isArray(forwardedFor)
            ? forwardedFor[0]
            : (forwardedFor ? String(forwardedFor).split(",")[0].trim() : req.ip);

        const meta = {
            method: req.method,
            path: req.originalUrl,
            statusCode,
            durationMs,
            ip,
        };

        // If auth middleware has populated req.user, include it
        if (req.user?._id) {
            meta.userId = String(req.user._id);
        }

        // Keep request logging minimal; detailed error logging happens in error middleware
        if (statusCode >= 400) {
            logger.debug("Request completed", meta);
        } else {
            logger.info("Request completed", meta);
        }
    });

    next();
};

module.exports = requestLogger;
