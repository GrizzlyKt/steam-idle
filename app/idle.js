const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const config = require('./config.json');

const client = new SteamUser();
const community = new SteamCommunity();

var z = config.games;
let x = "";
let y;
let e = 0;

if (isNaN(z.game1)) {
    if(z.game1.startsWith("https://ste")) {                  // https://steamcommunity.com/id/confern/gamecards/365450/
        x = z.game1.substr(config.steamurl.length);          // gamecards/365450/
        y = x.substr(10);                                    // 365450/
        e = y.slice(0, -1);                                  // 365450
    }
} 
else if (z.game1.length >= 3) {
    e = z.game1;
} else {
    console.log(`ERROR: GAME(${z.game1}). You've done something wrong, please check your config file.`);
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
        client.gamesPlayed([Math.floor(e-0)]);
    })
});

