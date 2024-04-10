// test bullmq with only cloud redis, remove from url line: // || "redis://127.0.0.1:6379" || "redis://localhost:6379",
// use try/catch with error handling on parsing of REDIS URI
let redis_uri;
try {
    redis_uri = new URL(process.env.REDIS_TLS_URL || process.env.REDIS_URL);
} catch (error) {
    throw new Error(`Invalid Redis URI: ${error.message}`);
}

module.exports = {
    redis: {
        tls_url: redis_uri,
        url: redis_uri,
        redis_url: redis_uri,
        redis_host: redis_uri.hostname,
        redis_port: parseInt(redis_uri.port, 10),
        redis_username: null, // for heroku redis, use null, not ""
        redis_password: redis_uri.password,
        redisBullMqFullConfig: {
            host: redis_uri.hostname,
            port: parseInt(redis_uri.port, 10),
            username: redis_uri.username,
            password: redis_uri.password,
            maxRetriesPerRequest: null,
            connectionPool: true,
            connectTimeout: 10000, // timeout in milliseconds
            enableOfflineQueue: true,
            enableReadyCheck: true,
            lazyConnect: true,
            maxPoolSize: 3,
            reconnectOnError: true,
            showFriendlyErrorStack: true,
            tls: { rejectUnauthorized: false }, // workaround heroku ssl certificate chain issues
        }
    }
};
