const fs = require("fs");
module.exports.config = {
	name: "gwenchana",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung - Fixed by Akhiro", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "gwenchana",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("gwenchana")==0 || (event.body.indexOf("Gwenchana")==0)) {
		var msg = {
				body: "𝗚𝘄𝗲𝗻𝗰𝗵𝗮𝗻𝗮~",
				attachment: fs.createReadStream(__dirname + `/noprefix/gwenchana.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🥺", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }