const axios = require('axios');

module.exports.config = {
  name: "gemini2",
  hasPermssion: 0,
  credits: "Jonell Magallanes",
  description: "Ask questions with Gemini AI",
  commandCategory: "AI",
  usages: "[question]",
  cooldowns: 5,
};
  module.exports.run = async function ({ args, event, api }) {
    const content = args.join(" ");
    if (!content) {
      return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗌𝗈𝗆𝖾 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌!", event.threadID, event.messageID);
    }
api.sendMessage("⏱️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗚𝗘𝗠𝗜𝗡𝗜 𝗔𝗜 𝗂𝗌 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 𝗒𝗈𝗎𝗋 𝖺𝗇𝗌𝗐𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID, event.messageID);
    try {
      const response = await axios.get(`https://bnw.samirzyx.repl.co/api/Gemini?text=${content}`);
      const candidates = response.data.candidates;
      if (candidates.length > 0) {
        const geminiResponse = candidates[0].content.parts.map(part => part.text).join(" ");
        return api.sendMessage(`♊ | 𝗚𝗘𝗠𝗜𝗡𝗜 𝗔𝗜\n\n ${geminiResponse}`, event.threadID, event.messageID);
      } else {
        return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗚𝗘𝗠𝗜𝗡𝗜 𝗔𝗜 𝖽𝗂𝖽𝗇'𝗍 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("Gemini AI didn't respond:", error.message);
      return api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝗐𝖺𝗌 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽. 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
    }
};