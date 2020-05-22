

// load all global users
// check update interval
// compare to real interval
// record out of date.

const bl = require('./bl.js');
const email = require('./email-generator');
const mailer = require('./mailer.js');

const weekInSeconds = 60*60*24*7
const demoData = [
  {
    id: 123,
    name: 'john',
    lastCom: Math.floor((new Date() / 1000) - 1.5 * weekInSeconds),
    frequency: weekInSeconds
  },
  {
    id: 12334,
    name: 'chaz',
    lastCom: Math.floor((new Date() / 1000) - 8 * weekInSeconds),
    frequency: weekInSeconds*4
  },
  {
    id: 123345,
    name: 'dave',
    lastCom: Math.floor((new Date() / 1000) - 0.5 * weekInSeconds),
    frequency: weekInSeconds
  }
]

const run = async () => {
  const data = demoData;
  const expired = bl.getExpired(data);
  console.log(expired)
  const emailBody = await email.generateEmail(expired);
  console.log(emailBody)
  //await mailer.send(emailBody);
  // await email.send();
}

run()
