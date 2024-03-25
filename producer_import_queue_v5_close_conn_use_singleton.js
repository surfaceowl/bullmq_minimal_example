// producer_import_queue_v2_conn_stays_open.js
// re-run this file every time you want to submit a job
// this file closes the redis connection after every submittal

const myQueue = require('./queue_def_v3_singleton')

console.log(`calling producer_import_queue.js`)

async function emailSchedule(email, message, delay=2000) {
  await myQueue.waitUntilReady();
  console.log('Queue is ready, starting application...');
  await myQueue.add('email', { email, message }, { delay: delay , removeOnComplete: 10});
  console.log(`producer_import_queue.js_v5_use_singleton: email added with msg: ${ message }`);
  await myQueue.close();
  console.log('producer_import_queue.js_v5_use_singleton: Redis connection closed.');
}

emailSchedule("foo@bar.com", "Hello World -v5 using singleton queue!"); // The email will be available for consumption after 5 seconds.
