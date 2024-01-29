const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot5",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "AkhiroKiyoshi",
  description: "goibot auto respond of the bot if you triggered the keywords",
  commandCategory: "auto-resp",
  usages: "...",
  cooldowns: 2,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["𝖣𝗈𝗇'𝗍 𝖻𝖾 𝗌𝖼𝖺𝗋𝖾𝖽 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖦𝗈𝖽 𝗂𝗌 𝗐𝗂𝗍𝗁 𝗎𝗌 ♡︎","𝖲𝖼𝖺𝗋𝖾𝖽?, 𝗐𝗁𝗒 𝖺𝗋𝖾 𝗒𝗈𝗎 𝗌𝖼𝖺𝗋𝖾𝖽 𝗆𝖺𝗌𝗍𝖾𝗋?, 𝖩𝗎𝗌𝗍 𝖺𝗅𝗐𝖺𝗒𝗌 𝗋𝖾𝗆𝖾𝗆𝖻𝖾𝗋 𝖦𝖮𝖣 𝗂𝗌 𝖺𝗅𝗐𝖺𝗒𝗌 𝗐𝗂𝗍𝗁 𝗎𝗌 ♡︎","𝖦𝖮𝖣 𝗂𝗌 𝖺𝗅𝗐𝖺𝗒𝗌 𝗐𝗂𝗍𝗁 𝗎𝗌 𝗆𝖺𝗌𝗍𝖾𝗋. 𝖣𝗈𝗇𝗍 𝖻𝖾 𝗌𝖼𝖺𝗋𝖾𝖽."];
  var respo1 = tl[Math.floor(Math.random() * tl.length)]



     if (event.body.indexOf("im scared")==0 ||(event.body.indexOf("Im scared")==0 ||(event.body.indexOf("katakot")==0 ||(event.body.indexOf("Katakot")==0 ||(event.body.indexOf("scary")==0 ||(event.body.indexOf("Scary")==0 ||(event.body.indexOf("scared")==0 ||(event.body.indexOf("takot")==0 ||(event.body.indexOf("Takot")==0 ||(event.body.indexOf("ihh katakot")==0 ||(event.body.indexOf("Ihh katakot")==0 ||(event.body.indexOf("wahh katakot")==0 || (event.body.indexOf("Wahh katakot")==0 || (event.body.indexOf("takot na")==0 || (event.body.indexOf("natatakot")==0 ||(event.body.indexOf("Natatakot")==0 ||(event.body.indexOf("matakot")==0 ||(event.body.indexOf("Matakot")==0 ||(event.body.indexOf("apakatakot")==0 || (event.body.indexOf("Apakatakot")==0 || (event.body.indexOf("natakot ako")==0 || (event.body.indexOf("Natakot ako")==0 ||(event.body.indexOf("wahh")==0 ||(event.body.indexOf("Wahhh")==0 ||(event.body.indexOf("bruh katakot")==0 || (event.body.indexOf("Bruh katakot")==0 || (event.body.indexOf("takot ems")==0 || (event.body.indexOf("Takot ems")==0)))))))))))))))))))))))))))) {
      var msg = {
        body: `${respo1}`
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙋‍♂️", event.messageID, (err) => {}, true)
  };
}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
