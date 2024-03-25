// queue_def.js

const { Queue } = require('bullmq')
config = require("./config")
redisURL = config.redis.url

const redisConfiguration = {
  connection: {
    url: redisURL,
  }
}

console.log(`queue_def.js redisURL: ${redisURL}`)


const myQueue = new Queue('emailSchedule', {
  connection: redisConfiguration.connection,
  defaultJobOptions: {
    delay: 1000,             // Delay the job by 1000 ms
    attempts: 3,             // Retry the job 3 times if it fails
    backoff: 3000,           // Delay in milliseconds between retry attempts
    priority: 2,             // Set job priority
    removeOnComplete: true   // removes job if successful
    // You can add more default options as needed
  }
});

module.exports = myQueue;
