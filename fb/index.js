
const fbApi = require('./async-fb.js');
const threadHandler = require('./bl/threads/thread-handler.js');

const run = async () => {
  try {
    const api = new fbApi();
    await api.init();
    api.setOptions({selfListen: true})
    const threads = await api.getThreadList(50, null, []);
    let ids = await threadHandler.getUnknownIds(threads);
    ids = ids.slice(0,10);
    
    const results = await api.getUserInfo(ids);
    console.log(results);
    threadHandler.saveUsers(results);
    //asyncApi.listenMqtt(blhandleMessage);
  } catch (err) {
    console.log(err);
  }
}

run();