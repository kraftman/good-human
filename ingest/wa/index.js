const fs = require('fs');
const { Client, Location } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const messageHandler = require('./bl/message-handler');
const readyHandler = require('./bl/ready-handler');

const SESSION_FILE_PATH = './wa-session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ 
  puppeteer: { 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }, 
  session: sessionCfg 
});

client.initialize();

client.on('qr', (qr) => {
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
  await readyHandler.handleReady(client)
});

client.on('message', async (msg) => {
  await messageHandler.handleMessage(client, msg) 
});


client.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
});
