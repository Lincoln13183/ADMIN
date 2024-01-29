const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
    name: "music",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Play music through YouTube link or search keyword",
    commandCategory: "Youtube",
    usages: "[searchMusic]",
    cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 996214499) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗌𝖾𝗇𝗍 𝖻𝖾𝖼𝖺𝗎𝗌𝖾 𝗂𝗍 𝗂𝗌 𝗅𝖺𝗋𝗀𝖾𝗋 𝗍𝗁𝖺𝗇 25𝖬𝖡.', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body: `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n🎵 | 𝗧𝗶𝘁𝗹𝗲: ${data.title}\n⏱️ | 𝗧𝗶𝗺𝗲: ${this.convertHMS(data.dur)}\n⏳ | 𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝗧𝗶𝗺𝗲: ${Math.floor((Date.now()- data.timestart)/1000)} 𝗌𝖾𝖼𝗈𝗇𝖽𝗌\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
            
    }
    catch (e) { return console.log(e) }
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.run = async function ({ api, event, args }) {
    if (args.length == 0 || !args) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋 𝗍𝗁𝖾𝗋 𝗌𝖾𝖺𝗋𝖼𝗁 𝖿𝗂𝖾𝗅𝖽 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝖾𝗆𝗍𝗉𝗒!', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 26214400) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾 𝖼𝖺𝗇𝗇𝗈𝗍 𝖻𝖾 𝗌𝖾𝗇𝗍 𝖻𝖾𝖼𝖺𝗎𝗌𝖾 𝗂𝗍 𝗂𝗌 𝗅𝖺𝗋𝗀𝖾𝗋 𝗍𝗁𝖺𝗇 25𝖬𝖡.', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n🎵 | 𝗧𝗶𝘁𝗹𝗲: ${data.title}\n⏱️ | 𝗧𝗶𝗺𝗲: ${this.convertHMS(data.dur)}\n⏳ | 𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝗧𝗶𝗺𝗲: ${Math.floor((Date.now()- data.timestart)/1000)} 𝗌𝖾𝖼𝗈𝗇𝖽𝗌\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)
            
        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,6)).items;
            for (let value of data) {
              link.push(value.id);
              num = num+=1
              msg += (`${num} - ${value.title} (${value.length.simpleText})\n\n`);
            }
            var body = `»🔎 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 ${link.length} 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 𝗍𝗁𝖺𝗍 𝗆𝖺𝗍𝖼𝗁𝖾𝖽 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗌𝖾𝖺𝗋𝖼𝗁 𝗍𝖾𝗋𝗆:\n\n${msg}ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗈𝗋 𝗆𝖺𝗄𝖾 𝖺 𝖿𝖾𝖾𝖽𝖻𝖺𝖼𝗄 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖺𝗇𝖽 𝖼𝗁𝗈𝗈𝗌𝖾 𝗈𝗇𝗅𝗒 𝗈𝗇𝖾 𝖺𝗆𝗈𝗇𝗀 𝗍𝗁𝖾 𝖼𝗁𝗈𝗂𝖼𝖾𝗌 𝖺𝖻𝗈𝗏𝖾`
            return api.sendMessage({
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝗐𝖺𝗌 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗂𝗇 𝗍𝗁𝖾 𝖺𝗉𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋!!\n' + e, event.threadID, event.messageID);
        }
    }
  }