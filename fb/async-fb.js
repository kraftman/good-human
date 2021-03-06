const login = require("facebook-chat-api");
const fs = require('fs');

const { email, password } = require('./private.js');


const SESSION_FILE_PATH = './fbstate';


class fbApi {
  constructor(api) {
  }

  setOptions(options) {
    return this.api.setOptions(options);
  };

  getUserInfo(users) {
    return new Promise((resolve, reject) => {
      this.api.getUserInfo(users, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      })
    })
  }

  init() {
    return new Promise((resolve, reject) => {
      let sessionCfg = {email, password};
      const fileExists = fs.existsSync(SESSION_FILE_PATH)
      if (fileExists) {
        sessionCfg = { appState: JSON.parse(fs.readFileSync(SESSION_FILE_PATH, 'utf8'))};
      } 
      
      login(sessionCfg, (err, api) => {
        if(err) return reject(err);
        // check error, remove file if its bad pass
      
        if (!fileExists) {
          fs.writeFileSync('./fbstate', JSON.stringify(api.getAppState()));
        }
        this.api = api;
        return resolve();
      });
    })
  };

  getThreadList(limit, timestamp, tags) {
    return new Promise((resolve, reject) => {
      this.api.getThreadList(limit, null, [],(err, data) => {
        if(err) return reject(err);
  
        return resolve(data);
      });
    })
  }
}

module.exports = fbApi