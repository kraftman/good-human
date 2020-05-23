
const fbApi = require('./async-fb.js');
const readyHandler = require('./bl/ready-handler.js')
const messageHandler = require('./bl/message-handler.js');

const run = async () => {
  try {
    const api = new fbApi();
    await api.init();
    messageHandler.init();
    api.setOptions({selfListen: true})
    await readyHandler.handleReady(api);
    
    const listener = async (event) => {
      if (event.type === 'message') {
        console.log('got message:', event)
        await readyHandler.checkUser(api, event.senderID);
        await messageHandler.writeEvents([event])
      } else {
        //console.log('ignoring event', event)
      }
    }
    api.listen(listener);
  } catch (err) {
    console.log(err);
  }
}

run();