// queue_def_v3_singleton.js

const { Queue } = require('bullmq');
const config = require('./config');

class MyQueueSingleton {
  // Creates a new instance.
  constructor() {
    const redisURL = config.redis.url;
    const redisConfiguration = {
      connection: {
        url: redisURL,
      },
    };

    this.myQueue = new Queue('emailSchedule', redisConfiguration);
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
