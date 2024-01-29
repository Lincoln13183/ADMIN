const axios = require('axios');

module.exports.config = {
  name: "kiyotaka",
  version: "2.3.0",
  credits: "akhirokiyoshi api by lian",//Dont change the credits please
  hasPermission: 0,
  commandCategory: "utility",
  usage: "[ prefix ]kiyotaka [prompt]",
  usePrefix: true,
  cooldown: 0
};

module.exports.run = async ({ api, event, args }) => {
  api.sendMessage("🔎 | 𝗞𝗜𝗬𝗢𝗧𝗔𝗞𝗔 𝗔𝗜 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...");
  try {
    const response = await axios.get(`https://lianeapi.onrender.com/@public/api/kiyokata?query=${args.join(" ")}`);
    api.sendMessage({ body: `🤵 | 𝗞𝗜𝗬𝗢𝗧𝗔𝗞𝗔 𝗔𝗜 \n\n${response.data.raw}` }, event.threadID, () => null, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 | 𝖲𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀 𝗍𝗈 𝗍𝗁𝖾 𝖠𝖯𝖨, 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID);
  }
};