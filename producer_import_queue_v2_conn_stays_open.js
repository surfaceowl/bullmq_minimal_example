// producer_import_queue_v2.js
// re-run this file to submit a new job to the queue
// this version keeps the redis connection open after every submission

const myQueue = require('./queue_def')

console.log(`calling producer_import_queue.js`)

async function emailSchedule(email, message, delay=2000) {
  await myQueue.add('email', { email, message }, { delay });
  console.log(`producer_import_queue.js: email added with msg: ${ message }`)
}

emailSchedule("foo@bar.com", "Hello World!"); // The email will be available for consumption after 5 seconds.
