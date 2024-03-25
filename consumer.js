// consumer.js

const { Worker } = require('bullmq')
config = require("./config")
redisURL = config.redis.url

const redisConfiguration = {
  connection: {
    url: redisURL,
  }
}

console.log(`consumer: redisURL: ${redisURL}`)

async function sendEmail(job) {
  const { email, message } = job.data;
  await console.log(`consumer: WORKER sent email msg ${message} to ${email}.`)
}

const worker = new Worker('emailSchedule', sendEmail, redisConfiguration);

worker.on('completed', job => {
  console.info(`${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`${job.id} failed with ${err.message}`);
});
