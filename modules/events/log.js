module.exports.config = {
  name: "log",
  eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
  version: "1.0.0",
  credits: "Mirai Team",
  description: "Ghi lại thông báo các hoạt đông của bot!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "✿︎━━☾︎ᴅᴇᴋᴜ ɴᴏᴛɪғɪᴄᴀᴛɪᴏɴ☽︎━━✿︎\nℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖠 𝗇𝖾𝗐 {task}" +
                        "\n\n🆔 | 𝗚𝗿𝗼𝘂𝗽 𝗜𝗗: " + event.threadID +
                        "\n👫 | 𝗔𝗰𝘁𝗶𝗼𝗻 𝗠𝗮𝗱𝗲 𝗕𝘆: " + event.author +
                        "\n🕔 | 𝗧𝗶𝗺𝗲: " + require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss D/MM/YYYY") +"\n\n✿︎━━━━━━━━━━━━━━━━━✿︎",
        task = "";
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name
            task = "𝗎𝗌𝖾𝗋 𝖼𝗁𝖺𝗇𝗀𝖾 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗇𝖺𝗆𝖾: '" + oldName + "' 𝖥𝗈𝗋𝗍 '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "𝗎𝗌𝖾𝗋 𝖺𝖽𝖽𝖾𝖽 𝖣𝖾𝗄𝗎𝖡𝗈𝗍 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉!";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "𝗎𝗌𝖾𝗋 𝗄𝗂𝖼𝗄𝖾𝖽 𝖣𝖾𝗄𝗎𝖡𝗈𝗍 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉!"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);

    return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
}