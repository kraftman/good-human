

const getExpired = (data) => {
  const now = Math.floor((new Date() / 1000));
  return data.filter(person => (now - person.lastCom  > person.frequency ))
}

module.exports = {
  getExpired
}