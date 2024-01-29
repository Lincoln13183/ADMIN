module.exports.config = {
	name: "eve",
  version: "7.3.1",
	hasPermssion: 0,
	credits: "John Lester", 
	description: "Just Respond",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = async function({ api, event, client, Users, __GLOBAL }) {
	var { threadID, messageID } = event;
	var name = await Users.getNameUser(event.senderID);
	if (event.body.indexOf("good eve")==0 || event.body.indexOf("Good eve")==0 || event.body.indexOf("good Eve")==0 || event.body.indexOf("Good Eve")==0 || event.body.indexOf("eve")==0 || event.body.indexOf("Eve")==0 || event.body.indexOf("magandang gabi")==0 || event.body.indexOf("Magandang gabi")==0 || event.body.indexOf("magandang Gabi")==0 || event.body.indexOf("Magandang Gabi")==0 ) { 
		var msg = {
				body: `🌆 | 𝖦𝗈𝗈𝖽 𝖤𝗏𝖾𝗇𝗃𝗇𝗀 𝗍𝗈𝗈 𝗆𝖺𝗌𝗍𝖾𝗋 ${name}, 𝗁𝖺𝗏𝖾 𝖺 𝗇𝗂𝖼𝖾 𝖾𝗏𝖾𝗇𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎 𝗆𝖺𝗌𝗍𝖾𝗋`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("❤️", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
