module.exports.config = {
  name: "shoti",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél", 
  description: "Shoti Command",
  commandCategory: "entertainment",
  cooldowns: 5
};
module.exports.run = async ({ api, event,}) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");

  api.sendMessage(`⏱️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖾 𝗏𝗂𝖽𝖾𝗈 𝗂𝗌 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍.`, event.threadID, event.messageID);
axios.get('https://your-shoti-api.vercel.app/shoti/?apikey=$shoti-1hg4gifgnlfdmeslom8').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  let callback = function () {
          api.sendMessage({
                                                body: `✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾’𝗌 𝗒𝗈𝗎𝗋 𝗌𝗁𝗈𝗍𝗂 𝗏𝗂𝖽𝖾𝗈 𝗋𝖾𝗊𝗎𝖾𝗌𝗍`,
            attachment: fs.createReadStream(__dirname + `/cache/shoti.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/shoti.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/shoti.${ext}`)).on("close", callback);
      }) .catch(err => {
                     api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖺𝗉𝗂 𝖾𝗋𝗋𝗈𝗋 𝗌𝗍𝖺𝗍𝗎𝗌: 𝟤𝟢𝟢", event.threadID, event.messageID);
    api.setMessageReaction("❎", event.messageID, (err) => {}, true);
                  })     
}