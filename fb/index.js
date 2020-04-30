
const { createApi, getThreadList } = require('./async-fb.js');
const { handleMessage, handleThreads }= require('./handle-message');

const run = async () => {
  try {
    const api = await createApi();
    api.setOptions({selfListen: true})
    const threads = await getThreadList(api, 50, null, [], handleThreads);
    console.log(threads)
    await handleThreads(threads);
    api.listenMqtt(handleMessage);
  } catch (err) {
    console.log(err);
  }
}

run();