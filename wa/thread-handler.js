const redis = require('./redis');

const getPeople = (chats) => {
  let ids = [];
  for (const chat of chats) {
    if(!chat.isGroup) {
      console.log('not group, skipping')
      break
    }
    // TODO: handle non group chat
    for (const part of chat.participants) {
      ids.push(part.id._serialized);
    }
  }
  return ids;
}

const getUnknown = async (chats) => {
  const contacts = getPeople(chats);
  const unknown = await redis.getUnknownContacts(contacts);
  return unknown;
}


const convertToDbContact = (contact) => {
  return {
    id: contact.id._serialized,
    name: contact.name,
    pushname: contact.pushname,
    number: contact.number,
  }
}
const saveNewContacts = async (contacts) => {
  const converted = contacts.map(convertToDbContact);
  await redis.saveContacts(converted);
}

module.exports = {
  getUnknown,
  saveNewContacts,
}