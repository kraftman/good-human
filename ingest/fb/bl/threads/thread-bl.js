

const getParticipantsFromThreads = (threads) => {
  let ids = []
  console.log(threads)
  for (const thread of threads) {
    ids = ids.concat(thread.participantIDs);
  }
  return ids
}

module.exports = {
  getParticipantsFromThreads
}