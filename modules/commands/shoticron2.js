const cron = require('node-cron');
const axios = require("axios");
const request = require('request');
const fs = require("fs");

const activeThreads = {};

module.exports.config = {
  name: "shoticron2",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Eugene Aguilar",
  // Converted by cliff
  changeCreditor: "ay_bayot",
  antichangeCredits: "100053549552408",
  usePrefix: true,
  description: "Automatically send shoti with on and off",
  commandCategory: "shoti cron",
  usages: "[on/off]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, input }) {
  const args = event.body.split(" ");
  const threadID = event.threadID;

  if (args[1] === "on") {
    if (!activeThreads[threadID]) {
      activeThreads[threadID] = true;
      api.sendMessage(
        `🟢 | 𝖲𝗁𝗈𝗍𝗂𝖼𝗋𝗈𝗇 𝖺𝗎𝗍𝗈 𝗏𝗂𝖽𝖾𝗈 𝗌𝖾𝗇𝖽𝖾𝗋 𝗂𝗌 𝗇𝗈𝗐 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝖾𝖽.`,
        event.threadID,
        (err, info) => {
          setTimeout(() => {
            api.unsendMessage(info.messageID);
          }, 20000);
        },
        event.messageID
      );

      cron.schedule('*/5 * * * *', async () => {
        try {
          if (activeThreads[threadID]) {
            let response = await axios.post(
              "https://your-shoti-api.vercel.app/api/v1/get",
              {
                apikey: "$shoti-1hg4gifgnlfdmeslom8",
              }
            );
            var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
            const userInfo = response.data.data.user;
            const username = userInfo.username;
            const nickname = userInfo.nickname;
            const tid = event.threadID;
            var rqs = request(encodeURI(response.data.data.url));
            rqs.pipe(file);
            file.on('finish', () => {
              api.sendMessage(
                {
                  body: `𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: @${username}\n𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: ${nickname}\n𝗧𝗜𝗗: ${tid}`,
                  attachment: fs.createReadStream(
                    __dirname + '/cache/shoti.mp4'
                  ),
                },
                threadID,
                (error, info) => {
                  if (!error) {
                    fs.unlinkSync(__dirname + '/cache/shoti.mp4');
                  }
                }
              );
            });
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    } else {
      api.sendMessage(
        "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗌𝗁𝗈𝗍𝗂𝖼𝗋𝗈𝗇 𝗏𝗂𝖽𝖾𝗈 𝗌𝖾𝗇𝖽𝖾𝗋 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖮𝖭 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗍𝗁𝗋𝖾𝖺𝖽.",
        threadID
      );
    }
  } else if (args[1] === "off") {
    if (activeThreads[threadID]) {
      activeThreads[threadID] = false;
      api.sendMessage(
        `🔴 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗌𝗁𝗈𝗍𝗂𝖼𝗋𝗈𝗇 𝗂𝗌 𝗇𝗈𝗐 𝖽𝗂𝗌𝖺𝖻𝗅𝖾𝖽.`,
        threadID
      );
    } else {
      api.sendMessage(
        "ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗌𝗁𝗈𝗍𝗂𝖼𝗋𝗈𝗇 𝗏𝗂𝖽𝖾𝗈 𝗌𝖾𝗇𝖽𝖾𝗋 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝗈𝖿𝖿 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗍𝗁𝗋𝖾𝖺𝖽.",
        threadID
      );
    }
  }
};