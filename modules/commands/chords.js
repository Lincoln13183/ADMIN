module.exports.config = {
	name: "chords",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Clark",
	description: "Search Chords",
  usages: "[song title]",
	commandCategory: "searches",
	cooldowns: 3
};

module.exports.run = async ({ api, event,args, Users, __GLOBAL }) => {
const tabs = require("ultimate-guitar")
 let qwerty = args.join(" ");
if (!qwerty) return api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝗨𝘀𝗮𝗴𝗲:\n${global.config.PREFIX}${this.config.name} 𝗍𝗂𝗍𝗅𝖾 𝗈𝖿 𝗌𝗈𝗇𝗀`, event.threadID, event.messageID);
             
try{
const res = await tabs.firstData(qwerty);
  
var title = res.title
var chords = res.chords
var type = res.type
var key = res.key
var artist = res.artist

api.sendMessage(`𝗔𝗿𝘁𝗶𝘀𝘁: ${artist}\n𝗧𝗶𝘁𝗹𝗲: ${title}\n𝗧𝘆𝗽𝗲: ${type}\n𝗞𝗲𝘆: ${key}\n━━━━━━━━━━━━━━━━━━━\n《《《《  𝗖𝗛𝗢𝗥𝗗𝗦  》》》》\n━━━━━━━━━━━━━━━━━━━\n${chords}\n━━━━━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
} catch(err){
 console.log("[ERR] " + err);
api.sendMessage("[ERR] " + err, event.threadID, event.messageID);
}
}