const login = require("facebook-chat-api");
const fs = require('fs');

const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

const getThreadList = (limit, timestamp, tags) => {
  return new Promise((resolve, reject) => {
    login({appState}, (err, api) => {
      if(err) return reject(err);
    
      api.getThreadList(10, null, [],(err, data) => {
          if(err) return reject(err);
    
          console.log(data);
          return resolve();
      });
    });
  })
};

module.exports = {
  getThreadList
}