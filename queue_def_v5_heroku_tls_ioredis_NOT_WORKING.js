// queue_def_v6_singleton.js

const { Queue } = require("bullmq");
const config = require("./config");
const IORedis = require("ioredis");

class MyQueueSingleton {
  // Creates a new instance.
  constructor() {
    const redisURL = config.redis.url;
    let connection = {
        uri: config.redis.tls_url
      };

    console.log(`connection: ${JSON.stringify(config.redis.tls_url)}`);
    this.myQueue = new Queue("emailSchedule", { connection: new IORedis(config.redis.tls_url)});
  }

  // Gets the singleton instance - creates a new queue if it does not exist
  static getInstance() {
    if (!MyQueueSingleton.instance) {
      MyQueueSingleton.instance = new MyQueueSingleton();
    }

    return MyQueueSingleton.instance.myQueue;
  }
}

module.exports = MyQueueSingleton.getInstance();
