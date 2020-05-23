const fs = require('fs');
const { Client, Location } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleMessage, handleThreads } = require('./redis.js');
const threadHandler = require('./thread-handler.js');
const influx = require('./influx.js');

const SESSION_FILE_PATH = './wa-session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

client.initialize();

client.on('qr', (qr) => {
  // NOTE: This event will not be fired if a session is specified.
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, {small: true});
});


client.on('authenticated', (session) => {
  console.log('AUTHENTICATED', session);
  sessionCfg=session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
        console.error(err);
    }
  });
});

client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessfull
  console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', async () => {
  console.log('READY');
  const chats = await client.getChats();
  let unknownIds = await threadHandler.getUnknown(chats);
  unknownIds = unknownIds.slice(0,10);
  const newContacts = [];
  for (const contactID of unknownIds) {
    newContacts.push(await client.getContactById(contactID));
  }
  console.log('savign new contacts: ', newContacts)
  await threadHandler.saveNewContacts(newContacts);
});

client.on('message', async msg => {
  console.log(msg);
  // TODO check the users exists and create them if not
  await influx.writeEvents([msg]);
  //await handleMessage(msg)
});


client.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
});
