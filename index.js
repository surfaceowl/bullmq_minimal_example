// import { Queue } from 'bullmq';
const Queue = require("bullmq")

const myQueue = new Queue('foo');

function addJobs() {
  myQueue.add('myJobName', { foo: 'bar' });
  myQueue.add('myJobName', { qux: 'baz' });
}

addJobs();


// import { Worker } from 'bullmq';
const Worker = require("bullmq")

const worker = new Worker('foo', async job => {
  // Will print { foo: 'bar'} for the first job
  // and { qux: 'baz' } for the second.
  console.log(job.data);
});


worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

