// producer_import_queue_v2_conn_stays_open.js
// re-run this file every time you want to submit a job
// this file closes the redis connection after every submittal

const myQueue = require('./queue_def_v2_config_options')

console.log(`calling producer_import_queue.js`)

async function exportSchedule(file, message, delay=2000) {
  await myQueue.waitUntilReady();
  console.log('Queue is ready, starting application...');
  await myQueue.add('export', { email: file, message }, { delay: delay , removeOnComplete: 10});
  console.log(`producer_import_queue.js_v5: file export called from python: ${ message }`);
  await myQueue.close();
  console.log('producer_import_queue.js_v5: File export complete.  Redis connection closed.');
}

exportSchedule("testfile.xlsx", "export complete - producer_import_queue_v5"); // The email will be available for consumption after 5 seconds.
