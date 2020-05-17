

const bl = require('./thread-bl.js');
const db = require('../../db/redis');


const getUnknownIds = async (threads) => {
  const ids = bl.getParticipantsFromThreads(threads);
  console.log(ids);
  const unknown = await db.getUnknownIds(ids);
  return unknown
}

const mapToDb = () => {

}

const saveUsers = (users) => {
  console.log(users)
  const converted = users.map(mapToDb);
  return db.saveUsers(converted);
}

module.exports = {
  getUnknownIds,
  saveUsers,
}
