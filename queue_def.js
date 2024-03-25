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


const myQueue = new Queue('emailSchedule', redisConfiguration);

module.exports = myQueue;
