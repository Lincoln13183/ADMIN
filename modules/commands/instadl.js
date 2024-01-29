const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "instadl",
  version: "1.0.",
  hasPermssion: 0,
  credits: "Réynél",
  description: "Download and send Instagram videos",
  commandCategory: "downloader",
  usages: "[link]",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  const link = args[0];

  if (!link || !link.startsWith("https://www.instagram.com/")) {
    api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆 𝗅𝗂𝗇𝗄.", event.threadID, event.messageID);
    return;
  }

  api.sendMessage("📥 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨'𝗆 𝖽𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝗏𝗂𝖽𝖾𝗈, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://instagramdl.hayih59124.repl.co/instagram?url=${encodeURIComponent(link)}`);
    const result = response.data.result[0];
    const videoURL = result._url;
    const path = __dirname + `/cache/instagram_video.mp4`;

    const videoData = (await axios.get(videoURL, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(videoData, 'utf-8'));

    api.sendMessage({
      body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗏𝗂𝖽𝖾𝗈",
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);
  } catch (error) {
    api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖾𝗋𝗋𝗈𝗋 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆 𝗏𝗂𝖽𝖾𝗈: ${error}`, event.threadID, event.messageID);
  }
};