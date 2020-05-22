const redis = require('./db/redis');


const getIdFromEvent = (event) => {

}

const processWaEvent = async (event) => {
  // check if group or private
  const id = getIdFromEvent(event);
  const date = event.timestamp;
  await redis.updateLastOnlineCommunication(id, date);
}

module.exports = {
  processWaEvent
}