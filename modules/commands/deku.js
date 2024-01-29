const axios = require("axios");

const simStatus = {
  enabled: true,
};

module.exports.config = {
  name: "deku",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "KENLIEPLAYS",
  description: "Talk to sim",
  commandCategory: "sim",
  usages: "[ask]",
  cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
  if (args[0] === 'off' && event.senderID === '61554222594723') {
    simStatus.enabled = false;
    return api.sendMessage('SIM COMMAND IS OFF', event.threadID, event.messageID);
  } else if (args[0] === 'on' && event.senderID === '61554222594723') {
    simStatus.enabled = true;
    return api.sendMessage('🟢 | 𝗦𝗜𝗠 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗌 𝗇𝗈𝗐 𝗂𝗌 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗍𝗈 𝗎𝗌𝖾!!\n\n©️ | 𝗞𝗘𝗡𝗟𝗜𝗘𝗣𝗟𝗔𝗬𝗦', event.threadID, event.messageID);
  }

  if (!simStatus.enabled) {
    return api.sendMessage('🔴 | 𝗦𝗜𝗠 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗌 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝗎𝗇𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋!!\n\n©️ | 𝗞𝗘𝗡𝗟𝗜𝗘𝗣𝗟𝗔𝗬𝗦', event.threadID, event.messageID);
  }

  const content = encodeURIComponent(args.join(" "));
  if (!args[0]) return api.sendMessage("ℹ️ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗒𝗉𝖾 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾...", event.threadID, event.messageID);
  try {
    const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ph&message=${content}&filter=true`);
    const respond = res.data.success;
    if (res.data.error) {
      api.sendMessage(`Error: ${res.data.error}`, event.threadID, event.messageID);
    } else {
      api.sendMessage(respond, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 | 𝖲𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀 𝗍𝗈 𝗍𝗁𝖾 𝖠𝖯𝖨, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
  }
};