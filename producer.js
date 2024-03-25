// producer.js

const { Queue } = require('bullmq')
config = require("./config")
redisURL = config.redis.url

const redisConfiguration = {
  connection: {
    url: redisURL,
  }
}

console.log(`redisURL: ${redisURL}`)


const myQueue = new Queue('emailSchedule', redisConfiguration);

async function emailSchedule(email, message, delay) {
  await myQueue.add('email', { email, message }, { delay});
  console.log(`producer: email added with msg: ${message}`)
}

emailSchedule("foo@bar.com", "Hello World!"); // The email will be available for consumption after 5 seconds.
