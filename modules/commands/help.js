module.exports.config = {
  name: "help",
  version: "1.0.2",
  credit: "Akhirokiyoshi",
  hasPermssion: 0,
  description: "commands list",
  commandCategory: "𝗕𝗢𝗧 𝗦𝗬𝗦𝗧𝗘𝗠",
  usages: "help",
  cooldowns: 0,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 100
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": "✿︎━━━━ [ %1 ] ━━━━✿︎\n\n🔎 | 𝗨𝘀𝗮𝗴𝗲: %3\n👾 | 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n🕔 | 𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 𝗌𝖾𝖼𝗈𝗇𝖽𝗌(𝗌)\n👫 | 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n📑 | 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: %2\n\n👨‍💻 | 𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲𝗱 𝗯𝘆 %7",
    "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
    "user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs-extra");
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `☂ ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} \n${commandGroup.cmds.join(' • ')}\n\n`);

    return axios.get('https://apikanna.maduka9.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
      let admID = "100072565756983";

      api.getUserInfo(parseInt(admID), (err, data) => {
      if(err){ return console.log(err)}
     var obj = Object.keys(data);
    var firstname = data[obj].name.replace("@", "");
    let callback = function () {
        api.sendMessage({ body:`Commands list\n\n` + msg + `\nSpamming the bot are strictly prohibited\n\nTotal Commands: ${commands.size}`, mentions: [{
                           tag: firstname,
                           id: admID,
                           fromIndex: 0,
                 }],
            attachment: fs.createReadStream(__dirname + `/cache/472.${ext}`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/472.${ext}`);
        if (autoUnsend == false) {
            setTimeout(() => { 
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 1000);
        }
        else return;
    }, event.messageID);
        }
         request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
     })
      })
};
  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 13;
    let i = 0;
    let msg = "";

    for (var [name, value] of (commands)) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

const first = numberOfOnePage * page - numberOfOnePage;
    i = first;
    const helpView = arrayInfo.slice(first, first + numberOfOnePage);


    for (let cmds of helpView) msg += `          ☏︎ |  ${global. config.PREFIX}${cmds}\n`;

    const siu = `✿︎━━━━━━━━━━━━━━━━━✿︎\n✱:｡✧* 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗟𝗶𝘀𝘁 *✧｡:✱\n✿︎━━━━━━━━━━━━━━━━━✿︎\n`;

    var tl = ["𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝖼𝗈𝗆𝗉𝗅𝖾𝗑 𝖺𝗇𝖽 𝗆𝗎𝗅𝗍𝗂𝖿𝖺𝖼𝖾𝗍𝖾𝖽 𝗉𝗁𝖾𝗇𝗈𝗆𝖾𝗇𝗈𝗇 𝗍𝗁𝖺𝗍 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗍𝗁𝖾 𝗌𝗎𝖻𝗃𝖾𝖼𝗍 𝗈𝖿 𝗌𝗍𝗎𝖽𝗒 𝖺𝗇𝖽 𝖼𝗈𝗇𝗍𝖾𝗆𝗉𝗅𝖺𝗍𝗂𝗈𝗇 𝖿𝗈𝗋 𝖼𝖾𝗇𝗍𝗎𝗋𝗂𝖾𝗌.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖽𝖾𝖿𝗂𝗇𝖾𝖽 𝖺𝗌 𝗍𝗁𝖾 𝗌𝗍𝖺𝗍𝖾 𝗈𝖿 𝖺𝗇 𝗈𝗋𝗀𝖺𝗇𝗂𝗌𝗆 𝗍𝗁𝖺𝗍 𝖾𝗑𝗁𝗂𝖻𝗂𝗍𝗌 𝖼𝖾𝗋𝗍𝖺𝗂𝗇 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋𝗂𝗌𝗍𝗂𝖼𝗌, 𝗌𝗎𝖼𝗁 𝖺𝗌 𝗆𝖾𝗍𝖺𝖻𝗈𝗅𝗂𝗌𝗆, 𝗀𝗋𝗈𝗐𝗍𝗁, 𝗋𝖾𝗉𝗋𝗈𝖽𝗎𝖼𝗍𝗂𝗈𝗇, 𝖺𝗇𝖽 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾 𝗍𝗈 𝗌𝗍𝗂𝗆𝗎𝗅𝗂.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖿𝗈𝗎𝗇𝖽 𝗂𝗇 𝖺 𝗐𝗂𝖽𝖾 𝗏𝖺𝗋𝗂𝖾𝗍𝗒 𝗈𝖿 𝖿𝗈𝗋𝗆𝗌, 𝖿𝗋𝗈𝗆 𝗌𝗂𝗇𝗀𝗅𝖾-𝖼𝖾𝗅𝗅𝖾𝖽 𝗈𝗋𝗀𝖺𝗇𝗂𝗌𝗆𝗌 𝗍𝗈 𝖼𝗈𝗆𝗉𝗅𝖾𝗑 𝗆𝗎𝗅𝗍𝗂𝖼𝖾𝗅𝗅𝗎𝗅𝖺𝗋 𝗈𝗋𝗀𝖺𝗇𝗂𝗌𝗆𝗌.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝗍𝗁𝗈𝗎𝗀𝗁𝗍 𝗍𝗈 𝗁𝖺𝗏𝖾 𝗈𝗋𝗂𝗀𝗂𝗇𝖺𝗍𝖾𝖽 𝗈𝗇 𝖤𝖺𝗋𝗍𝗁 𝖺𝖻𝗈𝗎𝗍 3.5 𝖻𝗂𝗅𝗅𝗂𝗈𝗇 𝗒𝖾𝖺𝗋𝗌 𝖺𝗀𝗈.","𝖳𝗁𝖾 𝗈𝗋𝗂𝗀𝗂𝗇 𝗈𝖿 𝗅𝗂𝖿𝖾 𝗂𝗌 𝗌𝗍𝗂𝗅𝗅 𝖺 𝗆𝗒𝗌𝗍𝖾𝗋𝗒, 𝖻𝗎𝗍 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗌𝖾𝗏𝖾𝗋𝖺𝗅 𝗁𝗒𝗉𝗈𝗍𝗁𝖾𝗌𝖾𝗌, 𝗌𝗎𝖼𝗁 𝖺𝗌 𝗍𝗁𝖾 𝗁𝗒𝖽𝗋𝗈𝗍𝗁𝖾𝗋𝗆𝖺𝗅 𝗏𝖾𝗇𝗍 𝗁𝗒𝗉𝗈𝗍𝗁𝖾𝗌𝗂𝗌 𝖺𝗇𝖽 𝗍𝗁𝖾 𝗉𝖺𝗇𝗌𝗉𝖾𝗋𝗆𝗂𝖺 𝗁𝗒𝗉𝗈𝗍𝗁𝖾𝗌𝗂𝗌.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖿𝗈𝗎𝗇𝖽 𝗂𝗇 𝖺 𝗐𝗂𝖽𝖾 𝗏𝖺𝗋𝗂𝖾𝗍𝗒 𝗈𝖿 𝖾𝗇𝗏𝗂𝗋𝗈𝗇𝗆𝖾𝗇𝗍𝗌, 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖽𝖾𝗉𝗍𝗁𝗌 𝗈𝖿 𝗍𝗁𝖾 𝗈𝖼𝖾𝖺𝗇 𝗍𝗈 𝗍𝗁𝖾 𝗍𝗈𝗉𝗌 𝗈𝖿 𝗆𝗈𝗎𝗇𝗍𝖺𝗂𝗇𝗌.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺𝖻𝗅𝖾 𝗍𝗈 𝖺𝖽𝖺𝗉𝗍 𝗍𝗈 𝖼𝗁𝖺𝗇𝗀𝗂𝗇𝗀 𝖾𝗇𝗏𝗂𝗋𝗈𝗇𝗆𝖾𝗇𝗍𝖺𝗅 𝖼𝗈𝗇𝖽𝗂𝗍𝗂𝗈𝗇𝗌 𝗍𝗁𝗋𝗈𝗎𝗀𝗁 𝗍𝗁𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌 𝗈𝖿 𝖾𝗏𝗈𝗅𝗎𝗍𝗂𝗈𝗇.","𝖤𝗏𝗈𝗅𝗎𝗍𝗂𝗈𝗇 𝗂𝗌 𝗍𝗁𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌 𝖻𝗒 𝗐𝗁𝗂𝖼𝗁 𝗍𝗁𝖾 𝗀𝖾𝗇𝖾𝗍𝗂𝖼 𝖼𝗈𝗆𝗉𝗈𝗌𝗂𝗍𝗂𝗈𝗇 𝗈𝖿 𝖺 𝗉𝗈𝗉𝗎𝗅𝖺𝗍𝗂𝗈𝗇 𝖼𝗁𝖺𝗇𝗀𝖾𝗌 𝗈𝗏𝖾𝗋 𝗍𝗂𝗆𝖾","𝖤𝗏𝗈𝗅𝗎𝗍𝗂𝗈𝗇 𝗂𝗌 𝖽𝗋𝗂𝗏𝖾𝗇 𝖻𝗒 𝗇𝖺𝗍𝗎𝗋𝖺𝗅 𝗌𝖾𝗅𝖾𝖼𝗍𝗂𝗈𝗇, 𝗐𝗁𝗂𝖼𝗁 𝗂𝗌 𝗍𝗁𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌 𝖻𝗒 𝗐𝗁𝗂𝖼𝗁 𝗈𝗋𝗀𝖺𝗇𝗂𝗌𝗆𝗌 𝗍𝗁𝖺𝗍 𝖺𝗋𝖾 𝖻𝖾𝗍𝗍𝖾𝗋 𝖺𝖽𝖺𝗉𝗍𝖾𝖽 𝗍𝗈 𝗍𝗁𝖾𝗂𝗋 𝖾𝗇𝗏𝗂𝗋𝗈𝗇𝗆𝖾𝗇𝗍 𝖺𝗋𝖾 𝗆𝗈𝗋𝖾 𝗅𝗂𝗄𝖾𝗅𝗒 𝗍𝗈 𝗌𝗎𝗋𝗏𝗂𝗏𝖾 𝖺𝗇𝖽 𝗋𝖾𝗉𝗋𝗈𝖽𝗎𝖼𝖾.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝖽𝗒𝗇𝖺𝗆𝗂𝖼 𝖺𝗇𝖽 𝖾𝗏𝖾𝗋-𝖼𝗁𝖺𝗇𝗀𝗂𝗇𝗀 𝗉𝗋𝗈𝖼𝖾𝗌𝗌.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖼𝗈𝗇𝗌𝗍𝖺𝗇𝗍𝗅𝗒 𝖾𝗏𝗈𝗅𝗏𝗂𝗇𝗀 𝖺𝗇𝖽 𝖺𝖽𝖺𝗉𝗍𝗂𝗇𝗀 𝗍𝗈 𝗇𝖾𝗐 𝖼𝗁𝖺𝗅𝗅𝖾𝗇𝗀𝖾𝗌.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝖿𝗋𝖺𝗀𝗂𝗅𝖾 𝖺𝗇𝖽 𝖽𝖾𝗅𝗂𝖼𝖺𝗍𝖾 𝗉𝗁𝖾𝗇𝗈𝗆𝖾𝗇𝗈𝗇 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖾𝖺𝗌𝗂𝗅𝗒 𝖽𝗂𝗌𝗋𝗎𝗉𝗍𝖾𝖽.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗉𝗋𝖾𝖼𝗂𝗈𝗎𝗌 𝖺𝗇𝖽 𝗏𝖺𝗅𝗎𝖺𝖻𝗅𝖾 𝗀𝗂𝖿𝗍 𝗍𝗁𝖺𝗍 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝖼𝗁𝖾𝗋𝗂𝗌𝗁𝖾𝖽 𝖺𝗇𝖽 𝗉𝗋𝗈𝗍𝖾𝖼𝗍𝖾𝖽.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗆𝗒𝗌𝗍𝖾𝗋𝗒 𝗍𝗁𝖺𝗍 𝗁𝖺𝗌 𝗒𝖾𝗍 𝗍𝗈 𝖻𝖾 𝖿𝗎𝗅𝗅𝗒 𝗎𝗇𝖽𝖾𝗋𝗌𝗍𝗈𝗈𝖽.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗃𝗈𝗎𝗋𝗇𝖾𝗒 𝗍𝗁𝖺𝗍 𝗂𝗌 𝖿𝗎𝗅𝗅 𝗈𝖿 𝖼𝗁𝖺𝗅𝗅𝖾𝗇𝗀𝖾𝗌 𝖺𝗇𝖽 𝗋𝖾𝗐𝖺𝗋𝖽𝗌.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗀𝗂𝖿𝗍 𝗍𝗁𝖺𝗍 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝖼𝖾𝗅𝖾𝖻𝗋𝖺𝗍𝖾𝖽 𝖺𝗇𝖽 𝖾𝗇𝗃𝗈𝗒𝖾𝖽.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗉𝗋𝖾𝖼𝗂𝗈𝗎𝗌 𝗋𝖾𝗌𝗈𝗎𝗋𝖼𝖾 𝗍𝗁𝖺𝗍 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝗉𝗋𝗈𝗍𝖾𝖼𝗍𝖾𝖽 𝖺𝗇𝖽 𝗉𝗋𝖾𝗌𝖾𝗋𝗏𝖾𝖽.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗆𝗂𝗋𝖺𝖼𝗅𝖾 𝗍𝗁𝖺𝗍 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝖼𝗁𝖾𝗋𝗂𝗌𝗁𝖾𝖽 𝖺𝗇𝖽 𝖼𝖾𝗅𝖾𝖻𝗋𝖺𝗍𝖾𝖽.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝖼𝗁𝖺𝗅𝗅𝖾𝗇𝗀𝖾 𝗍𝗁𝖺𝗍 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝖿𝖺𝖼𝖾𝖽 𝖺𝗇𝖽 𝗈𝗏𝖾𝗋𝖼𝗈𝗆𝖾.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗃𝗈𝗎𝗋𝗇𝖾𝗒 𝗍𝗁𝖺𝗍 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝗌𝖺𝗏𝗈𝗋𝖾𝖽 𝖺𝗇𝖽 𝖾𝗇𝗃𝗈𝗒𝖾𝖽.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗀𝗂𝖿𝗍 𝗍𝗁𝖺𝗍 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝖺𝗉𝗉𝗋𝖾𝖼𝗂𝖺𝗍𝖾𝖽 𝖺𝗇𝖽 𝖼𝗁𝖾𝗋𝗂𝗌𝗁𝖾𝖽.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗆𝗂𝗋𝖺𝖼𝗅𝖾 𝗍𝗁𝖺𝗍 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝖼𝖾𝗅𝖾𝖻𝗋𝖺𝗍𝖾𝖽 𝖺𝗇𝖽 𝗁𝗈𝗇𝗈𝗋𝖾𝖽.","𝖫𝗂𝖿𝖾 𝗂𝗌 𝖺 𝗃𝗈𝗎𝗋𝗇𝖾𝗒 𝗍𝗁𝖺𝗍 𝗌𝗁𝗈𝗎𝗅𝖽 𝖻𝖾 𝖾𝗆𝖻𝗋𝖺𝖼𝖾𝖽 𝖺𝗇𝖽 𝗅𝗂𝗏𝖾𝖽 𝗍𝗈 𝗍𝗁𝖾 𝖿𝗎𝗅𝗅𝖾𝗌𝗍."];
    var respo1 = tl[Math.floor(Math.random() * tl.length)]
  const text = `\n✿︎━━━━━━━━━━━━━━━━━✿︎\n⌨︎ | 𝗣𝗔𝗚𝗘: ${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}\n𖤍 | 𝗕𝗢𝗧𝗡𝗔𝗠𝗘: ${global.config.BOTNAME}\n⌫ | 𝗣𝗥𝗘𝗙𝗜𝗫: ${global.config.PREFIX}\n☕︎ | 𝗕𝗢𝗧𝗢𝗪𝗡𝗘𝗥: ${global.config.BOTOWNER}\n✿︎━━━━━━━━━━━━━━━━━✿︎`;
    var link = [
      "https://i.postimg.cc/1zJtCfK5/Deku-Izuku-Midoriya-GIF-Deku-Izuku-Midoriya-Boku-No-Hero-Academia-Discover-Share-GIFs.gif",
      "https://i.postimg.cc/nVmNp9vD/x-x-x-Book-1.gif",
      "https://i.postimg.cc/3xwT8JrQ/Deku-Mha-GIF-Deku-Mha-Smile-Discover-Share-GIFs.gif",
      "https://i.postimg.cc/7699ZDYj/not-mine-dekuzs-on-We-Heart-It.gif",
      "https://i.postimg.cc/HLB8JLX0/Midoriya-Izuku-discovered-by-White-on-We-Heart-It.gif"

    ]
     var callback = () => api.sendMessage({ body: siu + "\n" + msg + text + "\n⚠︎ | 𝗗𝗶𝗱 𝘆𝗼𝘂 𝗸𝗻𝗼𝘄?\n➪ " + respo1 + "\n✿︎━━━━━━━━━━━━━━━━━✿︎", attachment: fs.createReadStream(__dirname + "/cache/leiamnashelp.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/leiamnashelp.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/leiamnashelp.jpg")).on("close", () => callback());
  } 
const leiamname = getText("moduleInfo", command.config.name, command.config.description, `${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits);

  var link = [ 
"https://i.imgur.com/rC2epSM.gif",
  ]
    var callback = () => api.sendMessage({ body: leiamname, attachment: fs.createReadStream(__dirname + "/cache/leiamnashelp.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/leiamnashelp.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/leiamnashelp.jpg")).on("close", () => callback());
};