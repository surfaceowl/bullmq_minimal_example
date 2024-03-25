## Minimal working job queue using Redis, Node and BullMQ NPM Library

Create minimal working example to understand different configuration options and BullMQ syntax.<br>

Instructions:<br>
Install Node v21+<br>
Install and run Redis database, or provide redis_url to working instance. Update `config.js` as required.<br>
Clone repo, navigate to project root and run **npm install** <br>
from terminal or IDE run at least three processes: <br> 
1. **producer_import_queue_v4...** or similar - which generates jobs into the queue, and logs progress in terminal. <br>
2. **consumer.js**  which consumers jobs from the queue and logs progress in terminal 2. <br>
3. **active_redis_conn.js** which polls redis, whoing #of active connections in terminal 3.  The results vary 
based on which producers are being run, and how many producer files are running.<br>