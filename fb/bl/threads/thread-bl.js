

const getParticipantsFromThreads = (threads) => {
  const ids = {}
  for (const thread of threads) {
    ids.contact(thread.participantIDs);
  }
  return ids
}

module.exports = {
  getParticipantsFromThreads
}