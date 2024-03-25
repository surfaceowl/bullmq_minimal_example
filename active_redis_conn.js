// active_redis_conn.js

// const Queue = require('./queue_def')
const Redis = require('ioredis');

config = require("./config")
redisURL = config.redis.url

const redisConfiguration = {
  connection: {
    url: redisURL,
  }
}

const redis = new Redis({ redisConfiguration });

// const queue = new Queue('myQueue', { connection: redis });

// Function to get the number of active connections
async function getActiveRedisConnections() {
  const info = await redis.info('clients');
  const activeConnections = info.match(/connected_clients:(\d+)/)[1];
  console.log(`redis client info: ${info}`)
  return parseInt(activeConnections, 10);
}

// Usage
getActiveRedisConnections().then((count) => {
  console.log(`Active Redis connections: ${count}`);
});

