import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // using the ip address of the user to rate limit
        const identifier = req.ip || req.connection.remoteAddress || 'anonymous';
        const { success } = await ratelimit.limit(identifier);
        if (!success) {
            // rate limit exceeded. error 429 means too many requests
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }
        next();
    }
    catch (error) {
        console.error("Rate limiting error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default rateLimiter;