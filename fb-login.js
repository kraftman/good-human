const fs = require("fs");
const login = require("facebook-chat-api");
const { email, password } = require('./private.js');

login({email, password}, (err, api) => {
    if(err) return console.error(err);

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});