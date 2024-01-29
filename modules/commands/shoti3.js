module.exports.config = {
  name: "shoti3",
  version: "1.0.3",
  credits: "Réynél",
  description: "Generate random tiktok girl videos",
  hasPermssion: 0,
  commandCategory: "entertainment",
  usage: "[shoti3]",
  cooldowns: 5,
  dependencies: [],
};
 
module.exports.run = async function ({ api, event }) {
  try {
    const axios = require("axios");
    const request = require("request");
    const fs = require("fs");
    let response = await axios.post(
      "https://api--v1-shoti.vercel.app/api/v1/get",
      {
        apikey: "$shoti-1hebrcerffribmcn18g",
      },
    );
    var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
    var rqs = request(encodeURI(response.data.data.url));
    rqs.pipe(file);
    file.on("finish", () => {
      return api.sendMessage(
        {
          body: `@${response.data.data.user.username}`,
          attachment: fs.createReadStream(__dirname + "/cache/shoti.mp4"),
        },
        event.threadID,
        event.messageID,
      );
    });
    file.on("error", (err) => {
      api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝖺𝗍: ${err}`, event.threadID, event.messageID);
    });
  } catch (error) {
    api.sendMessage(
      "❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗈𝗋 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝖲𝗁𝗈𝗍𝗂 𝗏𝗂𝖽𝖾𝗈:" + error,
      event.threadID,
      event.messageID,
    );
  }
};