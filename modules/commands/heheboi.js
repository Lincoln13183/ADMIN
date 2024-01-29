const fs = require("fs");
module.exports.config = {
	name: "hehe boi",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung - Fixed by Akhiro", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "hehe boi",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("hehe boi")==0 || (event.body.indexOf("Hehe boi")==0)) {
		var msg = {
				body: "𝗛𝗲𝗵𝗲 𝗕𝗼𝗶 😏",
				attachment: fs.createReadStream(__dirname + `/noprefix/hehe.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😏", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }