const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const config = require('./config.json');

const client = new SteamUser();
const community = new SteamCommunity();

var z = config.games;
let x = "";
let y;
let one;
let two;
let three;
let four;
let five;

if (isNaN(z.game1)) {
    if(z.game1.startsWith("https://ste")) {
        x = z.game1.substr(config.steamurl.length);          
        y = x.substr(10);                                   
        one = y.slice(0, -1);                       
    }
}
if (isNaN(z.game2)) {
    if(z.game2.startsWith("https://ste")) {
        x = z.game2.substr(config.steamurl.length);          
        y = x.substr(10);                                   
        two = y.slice(0, -1);                      
    }
}
if (isNaN(z.game3)) {
    if(z.game3.startsWith("https://ste")) {
        x = z.game3.substr(config.steamurl.length);          
        y = x.substr(10);                                   
        three = y.slice(0, -1);                       
    }
}
if (isNaN(z.game4)) {
    if(z.game4.startsWith("https://ste")) {
        x = z.game4.substr(config.steamurl.length);          
        y = x.substr(10);                                   
        four = y.slice(0, -1);                        
    }
}
if (isNaN(z.game5)) {
    if(z.game5.startsWith("https://ste")) {
        x = z.game5.substr(config.steamurl.length);          
        y = x.substr(10);                                   
        five = y.slice(0, -1);                       
    }
}
else if (z.game1.length >= 3) {
    one = z.game1;
}
else if (z.game2.length >= 3) {
    two = z.game2;
}
else if (z.game3.length >= 3) {
    three = z.game3;
}
else if (z.game4.length >= 3) {
    four = z.game4;
}
else if (z.game5.length >= 3) {
    five = z.game5;
} else {
    console.log("Something went wrong, please check your config.");
    return
}

const logOnOptions = {
    accountName: config.username,
    password: config.password,
    twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
};


client.logOn(logOnOptions);

client.on('loggedOn', (details, parental) => {
    client.getPersonas([client.steamID], (personas) => {
        console.log(` Succesfully logged in as ${personas[client.steamID].player_name}`);
        client.setPersona(SteamUser.Steam.EPersonaState.Online);
        client.gamesPlayed([Math.floor(one - 0), Math.floor(two - 0), Math.floor(three - 0), Math.floor(four - 0), Math.floor(five - 0)]);
        console.log("  We're now idling");
    })
});


var now = new Date();
var delay = 10 * 60 * 1000; // 10 min in msec
var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();

setTimeout(function update() {
    client.setPersona(SteamUser.Steam.EPersonaState.Offline);
    client.gamesPlayed(["Restarting..."]);
    client.setPersona(SteamUser.Steam.EPersonaState.Online);
    client.gamesPlayed([Math.floor(one - 0), Math.floor(two - 0), Math.floor(three - 0), Math.floor(four - 0), Math.floor(five - 0)]);
    setTimeout(update, delay);
}, start);
