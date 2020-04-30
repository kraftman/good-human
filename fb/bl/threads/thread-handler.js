

const bl = require('./thread-bl.js');

const getUnknownIds = async (threads) => {
  const ids = bl.getParticipantsFromThreads(threads);
  const unknown = await redis.getUnknownIds(ids);
}

module.exports = {
  getUnknownIds
}
