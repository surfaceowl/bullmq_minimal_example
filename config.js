module.exports = {
    redis: {
        tls_url: process.env.REDIS_TLS_URL || null,
        url: process.env.REDIS_URL || "redis://127.0.0.1:6379" || "redis://localhost:6379",
    }
};
