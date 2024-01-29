const axios = require('axios');

module.exports.config = {
  name: "blackbox",
  version: "2.3.0",
  credits: "akhirokiyoshi api by adonis",
  hasPermission: 0,
  commandCategory: "utility",
  usage: "[ prefix ]blackbox [prompt]",
  usePrefix: true,
  cooldown: 0
};

module.exports.run = async ({ api, event, args }) => {
  api.sendMessage("🔎 | 𝗕𝗟𝗔𝗖𝗞𝗕𝗢𝗫 𝗔𝗜 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇!", event.threadID);
  try {
    const response = await axios.get(`https://api.easy-api.online/api/blackbox?query=${args.join(" ")}`);
    api.sendMessage("👾 | 𝗕𝗟𝗔𝗖𝗞𝗕𝗢𝗫 𝗔𝗜\n\n" + response.data.raw, event.threadID, () => null, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 | 𝖲𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀 𝗍𝗈 𝗍𝗁𝖾 𝖠𝖯𝖨. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋. ", event.threadID);
  }
};