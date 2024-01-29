var mysterious = "Siegfried Sama";
const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "slap",
  version: "3.0.0",
  hasPermssion: 0,
  credits: `${mysterious}`,
  description: "it's just imitated because the old slap doesn't work",
  commandCategory: "...",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async({ api, event, Threads, global }) => {
  var link = [ "https://i.postimg.cc/1tByLBHM/anime-slap.gif", ];
   var mention = Object.keys(event.mentions);
     let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Mention 1 person that you want to slap", threadID, messageID);
   var callback = () => api.sendMessage({body:`𝗦𝗹𝗮𝗽𝗽𝗲𝗱! ${tag}` + `\n\n𝖦𝗈𝗆𝖾𝗇𝖺𝗌𝖺𝗂 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖨 𝗍𝗁𝗈𝗎𝗀𝗁𝗍 𝗍𝗁𝖾𝗋𝖾'𝗌 𝖺 𝗆𝗈𝗌𝗊𝗎𝗂𝗍𝗈 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗆𝗈𝗍𝗁𝖾𝗋𝖿𝗏𝖼𝗄𝗂𝗇𝗀 𝖿𝖺𝖼𝖾.`,mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],attachment: fs.createReadStream(__dirname + "/cache/slap.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/slap.gif"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/slap.gif")).on("close",() => callback());
}