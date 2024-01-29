module.exports.config = {
name: "chesca2",
version: "1.0.0",
hasPermssion: 0,
credits: "Prince Sanel/LiANE for ChescaAI",
description: "ChescaAi by LiANE",
price: 0,
commandCategory: "Random",
cooldowns: 3,
};
module.exports.run = async function ({ api, args, event, permssion, Currencies }) {
	const { threadID, messageID, senderID } = event;
	const axios = require("axios");
	try {
		const req = args.join(" ");
    const { getData, increaseMoney, decreaseMoney } = Currencies;
    const moneyUser = (await getData(senderID)).money;
    if (this.config.price > moneyUser) {
    return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝗆𝗈𝗇𝖾𝗒 𝗂𝗌 𝗇𝗈𝗍 𝖾𝗇𝗈𝗎𝗀𝗁 𝗍𝗈 𝖽𝗈 𝗍𝗁𝗂𝗌 𝗋𝖾𝗊𝗎𝖾𝗌𝗍. 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝖻𝖺𝗅𝖺𝗇𝖼𝖾 𝖻𝖾𝖿𝗈𝗋𝖾 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", threadID, messageID);
    }
		if (!req) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝗇𝖾𝖾𝖽 𝖺 𝗉𝗋𝗈𝗆𝗍 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽.", threadID, messageID);
    api.sendMessage("💭 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗖𝗵𝗲𝘀𝗰𝗮 𝗔𝗜 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇... 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍.", threadID, messageID);
    await decreaseMoney(senderID, parseInt(this.config.price));
		const res = await axios.get(`https://lianeapi.onrender.com/ask/chescaV2?query=${encodeURIComponent(req)}`);
      const fs = require('fs');
      api.sendMessage({ body: `🐇 | 𝗖𝗛𝗘𝗦𝗖𝗔 𝗔𝗜

      ${res.data.raw}`,
      attachment: fs.createReadStream(__dirname + "/noprefix/rabbit.gif")
      }, threadID, messageID);
	} catch {
		api.sendMessage("❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾𝗌 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝖺𝗉𝗂.", threadID, messageID);
	}
}