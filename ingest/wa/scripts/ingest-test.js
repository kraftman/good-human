const influx = require('../influx.js');

const testData = {
    mediaKey: undefined,
    id:
     { 
       fromMe: false,
       remote: '447838404646@c.us',
       id: '2554FF2BEF264DD8D97B300A38CD74E7s',
       _serialized: 'false_447838404646@c.us_2554FF2BEF264DD8D97B300A38CD74E7' },
    ack: -1,
    hasMedia: false,
    body: 'Go ahead',
    type: 'chat',
    timestamp: 1590090923,
    from: '447838404646@c.us',
    to: '447947745935@c.us',
    author: undefined,
    isForwarded: false,
    broadcast: false,
    fromMe: false,
    hasQuotedMsg: false,
    location: undefined,
    mentionedIds: [] 
}


const test = async () => {
  try {
    await influx.writeEvents([testData]);
    console.log('done')
  } catch (e) {
    console.log('error:', e)
  }
}
test();
