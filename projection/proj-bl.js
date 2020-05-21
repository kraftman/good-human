const redis = require('./db/redis');

const processWaEvent = async (event) => {
  // check if group or private
  const user = await redis.getUser(event.userid);
  const 
}