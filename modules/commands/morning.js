module.exports.config = {
	name: "morning",
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
	if (event.body.indexOf("good morning")==0 || event.body.indexOf("Good morning")==0 || event.body.indexOf("good Morning")==0 || event.body.indexOf("Good Morning")==0 || event.body.indexOf("morning")==0 || event.body.indexOf("Morning")==0 || event.body.indexOf("magandang umaga")==0 || event.body.indexOf("Magandang umaga")==0 || event.body.indexOf("magandang Umaga")==0 || event.body.indexOf("Magandang Umaga")==0 ) { 
		var msg = {
				body: `🌤️ | 𝖦𝗈𝗈𝖽 𝖬𝗈𝗋𝗇𝗂𝗇𝗀 𝗍𝗈𝗈 𝗆𝖺𝗌𝗍𝖾𝗋 ${name}, 𝖧𝖺𝗏𝖾 𝖺 𝗐𝗈𝗇𝖽𝖾𝗋𝖿𝗎𝗅𝗅 𝖽𝖺𝗒 𝗍𝗈 𝗒𝗈𝗎 𝗆𝖺𝗌𝗍𝖾𝗋`
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("❤️", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
