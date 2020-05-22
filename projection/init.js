const red = require('./redis'); 
const influx = require('./influx');
const proj = require('proj-bl');
let lastCheck = 0;

const init = async () => {
  const lastSync = red.getLastSync();
  const now = new Date();
  const data = influx.getDataBetween(lastSync, now);
  // check its sorted
  for (const event of data) {
    await proj.processWaEvent(event);
  }
}

module.exports = {

}

// connect to redis
// if no previous data, pull all data from influx
// populate projection
// if some data, get new data since last connect
// populate projectionsc

// what if new data comes in while we are syncing?
// ignore it for now