const fs = require("fs");
module.exports.config = {
	name: "ngongo",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung - Fixed by Akhiro", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "ngongo",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("ngongo")==0 || (event.body.indexOf("Ngongo")==0)) {
		var msg = {
				body: "𝗛𝘂𝗵? 𝗗𝗶𝗱 𝘆𝗼𝘂 𝘂𝗻𝗱𝗲𝗿𝘀𝘁𝗮𝗻𝗱 𝘁𝗵𝗶𝗶𝘀?",
				attachment: fs.createReadStream(__dirname + `/noprefix/ngongo.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🤣", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }