module.exports.config = {
  name: "shoti5",
  version: "5.0.0",
  hasPermssion: 0,
  credits: "Réynél", 
  description: "Filipina Shoti Girl",
  commandCategory: "entertainment",
  usages: "[shoti5]",
  cooldowns: 5
};
module.exports.run = async ({ api, event,}) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");

  api.sendMessage(`⏱️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝖿𝗂𝗅𝗂𝗉𝗂𝗇𝗈 𝗀𝗂𝗋𝗅 𝗌𝗁𝗈𝗍𝗂 𝗏𝗂𝖽𝖾𝗈 𝗂𝗌 𝗌𝖾𝗇𝖽𝗂𝗇𝗀, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍.`, event.threadID, event.messageID);
axios.get('https://jeka-api.luabot24.repl.co/shoti/?apikey=geloo').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  let callback = function () {
          api.sendMessage({
                                                body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝖿𝗂𝗅𝗂𝗉𝗂𝗇𝖺 𝗌𝗁𝗈𝗍𝗂:`,
            attachment: fs.createReadStream(__dirname + `/cache/shoti.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/shoti.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/shoti.${ext}`)).on("close", callback);
      }) .catch(err => {
                     api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽", event.threadID, event.messageID);
    api.setMessageReaction("❎", event.messageID, (err) => {}, true);
                  })     
}