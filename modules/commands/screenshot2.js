module.exports.config = {
  name: "screenshot2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Screenshot một trang web nào đó (NOT ALLOW NSFW PAGE)",
  commandCategory: "other",
  usages: "[url site]",
  cooldowns: 5,
  dependencies: {
        "fs-extra": "",
        "path": "",
        "url": ""
    }
};

module.exports.onLoad = async () => {
    const { existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    const path = resolve(__dirname, "cache", "pornlist.txt");

    if (!existsSync(path)) return await global.utils.downloadFile("https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt", path);
    else return;
}

module.exports.run = async ({ event, api, args, }) => {
    const { readFileSync, createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
    const url = global.nodemodule["url"];

    if (!global.moduleData.pornList) global.moduleData.pornList = readFileSync(__dirname + "/cache/pornlist.txt", "utf-8").split('\n').filter(site => site && !site.startsWith('#')).map(site => site.replace(/^(0.0.0.0 )/, ''));
    const urlParsed = url.parse(args[0]);

    if (global.moduleData.pornList.some(pornURL => urlParsed.host == pornURL)) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝗂𝗌 𝗌𝗂𝗍𝖾 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗂𝗌 𝗇𝗈𝗍 𝗌𝖾𝖼𝗎𝗋𝖾! [ 𝗡𝗦𝗙𝗪 𝗣𝗥𝗢𝗠𝗧 𝗟𝗜𝗡𝗞 𝗗𝗘𝗧𝗘𝗖𝗧𝗘𝗗 ]", event.threadID, event.messageID);

    try {
        const path = __dirname + `/cache/${event.threadID}-${event.senderID}s.png`;
        await global.utils.downloadFile(`https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/${args[0]}`, path);
        api.sendMessage({body:"✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗁𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗌𝖼𝗋𝖾𝖾𝗇𝗌𝗁𝗈𝗍 𝗀𝖾𝗇 𝗉𝗂𝖼",attachment: createReadStream(path) }, event.threadID, () => unlinkSync(path));
    }
    catch {
        return api.sendMessage("🤷‍♂️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝗂𝗌 𝖴𝖱𝖫 𝗅𝗂𝗇𝗄 𝗀𝗈𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋, 𝖨𝗌 𝗒𝗈𝗎𝗋 𝖿𝗈𝗋𝗆𝖺𝗍 𝗂𝗌 𝗂𝗇𝖼𝗈𝗋𝗋𝖾𝖼𝗍?", event.threadID, event.messageID);
    }
}