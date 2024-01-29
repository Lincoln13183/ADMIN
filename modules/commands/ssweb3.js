module.exports.config = {
  name: "ssweb3",
  version: "1.0.",
  hasPermssion: 0,
  credits: "Réynél",
  description: "screenshot website",
  commandCategory: "media",
  usages: "[vid/img] [url]",
  cooldowns: 5,
  usePrefix: true,
};

module.exports.run = async({ api, event, args }) => {
  const ax = require('axios');
  const f = require('fs-extra');
  const { threadID, messageID } = event;
  let url = args[1];
  if(!args[0] || !args[1]) {
   api.sendMessage(`❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖺 𝗐𝗋𝗈𝗇𝗀 𝖿𝗈𝗋𝗆𝖺𝗍 𝗎𝗌𝖾 𝗈𝖿 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽\n\n𝗲𝘅𝗮𝗺𝗽𝗹𝗲: ${global.config.PREFIX}𝗌𝗌𝗐𝖾𝖻 <𝗏𝗂𝖽 𝗈𝗋 𝗂𝗆𝗀> <𝗎𝗋𝗅>\n${global.config.PREFIX}𝗌𝗌𝗐𝖾𝖻 𝗏𝗂𝖽 𝗀𝗂𝗍𝗁𝗎𝖻(.)𝖼𝗈𝗆`, threadID, messageID);
  }
else if(args[0] == 'vid') {
    const g1 = await ax.get(`https://shot.screenshotapi.net/screenshot?token=SCAAVTH-AMKM99P-PD20T27-J3RG4FH&url=${url}&output=json&file_type=gif&wait_for_event=load&scrolling_screenshot=true`);
    let path = __dirname + `/cache/web.mp4`;
    const giff = (await ax.get(g1.data.screenshot, { responseType: "arraybuffer", })).data;
    
    f.writeFileSync(path, Buffer.from(giff, 'utf-8'));
    
    return api.sendMessage({
      body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍",
      attachment: f.createReadStream(path)
    }, threadID, () => f.unlinkSync(path), messageID);
    
  }
  else if(args[0] == "img") {
    const g2 = await ax.get(`https://shot.screenshotapi.net/screenshot?token=SCAAVTH-AMKM99P-PD20T27-J3RG4FH&url=${url}`);
    let path2 = __dirname + `/cache/web.png`;
    const img = (await ax.get(g2.data.screenshot, { responseType: "arraybuffer", })).data;
    
    f.writeFileSync(path2, Buffer.from(img, 'utf-8'));
    
    return api.sendMessage({
      body: "✅ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍",
      attachment: f.createReadStream(path2)
    }, threadID, () => f.unlinkSync(path2), messageID);
  }
};