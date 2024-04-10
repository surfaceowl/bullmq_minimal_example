// queue_def_v6_singleton.js

const { Queue, Worker } = require('bullmq');
const config = require('./config');

// console.log(`config.redis.redis_host, ${config.redis.redis_host}`)
// console.log(`config.redis.redis_port ${config.redis.redis_port}`)
// console.log(`config.redis.redis_username ${config.redis.redis_username}`)
// console.log(`config.redis.redis_password ${config.redis.redis_password}`)
console.log(`config.redis  ${JSON.stringify(config.redis)}\n\n`)

class MyQueueSingleton {
  // Creates a new instance.
  constructor() {
    const redisURL = config.redis.url;
    let connection = {
        uri: config.redis.tls_url
      };

    console.log(`connection: ${JSON.stringify(config.redis.tls_url)}`);
    this.myQueue = new Queue('emailSchedule', { connection: {
        host: config.redis.redis_host,
        port: config.redis.redis_port,
        username: config.redis.redis_username,
        password: config.redis.redis_password,
        tls: { rejectUnauthorized: false }
      }});
  }

  // Gets the singleton instance - creates a new queue if it does not exist
  static getInstance() {
    if (!MyQueueSingleton.instance) {
      MyQueueSingleton.instance = new MyQueueSingleton();
    }

    return MyQueueSingleton.instance.myQueue;
  }
}


// Worker function to process jobs
const processJobs = () => {
  const worker = new Worker('emailSchedule', async (job) => {
    // Simulate job processing
    console.log(`Job #${job.id} complete`);
  }, { connection: {
      host: config.redis.redis_host,
      port: config.redis.redis_port,
      username: config.redis.redis_username,
      password: config.redis.redis_password,
      tls: { rejectUnauthorized: false }
    }});

  worker.on('completed', (job) => {
    console.log(`Job #${job.id} has been completed.`);
  });

  worker.on('failed', (job, err) => {
    console.log(`Job #${job.id} has failed with error: ${err.message}`);
  });
};

// Function to add jobs to the queue
const addJobsToQueue = async () => {
  for (let i = 1; i <= 10; i++) {
    await myQueue.add('emailJob', { email: `user${i}@example.com` });
    console.log(`Added job #${i}`);
  }
};

// create the queue
const myQueue = MyQueueSingleton.getInstance();

// Add jobs to the queue
addJobsToQueue();

// Start processing jobs
processJobs();

module.exports = new MyQueueSingleton().myQueue;
