const login = require("facebook-chat-api");
const fs = require('fs');
const readline = require("readline");


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const messageHandler = require('./bl/message-handler.js');

const email = process.env.FB_USERNAME;
const password = process.env.FB_PASSWORD;
console.log('username:', email, ' password: ', password)


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
        //console.log('api callback', err, api);
        if (err && err.error === 'login-approval') {
          console.log('Enter code > ');
          rl.on('line', (line) => {
              err.continue(line);
              rl.close();
              //return resolve();
          });
        } else {
          console.log('here: ', err, api)
          if(err) {
            console.error(err)
            return reject(err)
          };
          // check error, remove file if its bad pass
        
          if (!fileExists) {
            fs.writeFileSync('./fbstate', JSON.stringify(api.getAppState()));
          }
          this.api = api;
          return resolve();
        }
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
  listen(callback) {
    this.api.listenMqtt((err, event) => {
      if(err) {
        console.log(err);
      }
      callback(event);
    });
  }
}

module.exports = fbApi