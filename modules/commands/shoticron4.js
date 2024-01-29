const axios = require('axios');
const fs = require('fs');
const request = require('request');

const shotiAutoState = {};
const shotiAutoInterval = {};
let videoCounter = 0;
let errorVideoCounter = 0;
const lastVideoError = {};
const defaultInterval = 60 * 60 * 1000; 

module.exports.config = {
  name: 'shoticron4 ',
  version: '1.0',
  hasPermission: 2,
  credits: 'Clark',
  description: 'Random shawty Video',
  commandCategory: 'cron',
  usages: '[on/off]',
  cooldowns: 0,
};

const shoticron = async (api, event, threadID) => {
  try {
    let response = await axios.post('https://api--v1-shoti.vercel.app/api/v1/get', { apikey: 'shoti-1hgn30msgapp542i0qg' });
    console.log('API Response:', response.data);

    if (response.data.error) {
      throw new Error(`API Error: ${response.data.error}`);
    }

    const userInfo = response.data.data.user;
    const videoInfo = response.data.data;
    const title = videoInfo.title;
    const durations = videoInfo.duration;
    const region = videoInfo.region;
    const username = userInfo.username;
    const nickname = userInfo.nickname;

    videoCounter++;

    const tid = event.threadID;
    const file = fs.createWriteStream('temp_video.mp4');
    const rqs = request(encodeURI(response.data.data.url));
    rqs.pipe(file);

    file.on('finish', () => {
      api.sendMessage({
        body: `🔖 | 𝗧𝗶𝘁𝗹𝗲: ${title}\n👤 | 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: @${username}\n✨ | 𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: ${nickname}\n⏱️ | 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${durations}`,
        attachment: fs.createReadStream('temp_video.mp4'),
      }, threadID, () => {
        fs.unlink('temp_video.mp4', (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err);
          }
        });
      });
    });
  } catch (error) {
    console.error('Error fetching or sending the video:', error);
    lastVideoError[threadID] = error.message;
    videoCounter++;
    errorVideoCounter++;
  }
};

module.exports.run = async ({ api, event }) => {
  const threadID = event.threadID;
  const commandArgs = event.body.toLowerCase().split(' ');

  const allowedAdminUID = '100080098527733';
  if (commandArgs[1] === 'setinterval') {
    const newIntervalValue = parseFloat(commandArgs[2]);
    const newIntervalUnit = commandArgs[3]?.toLowerCase();

    if (!isNaN(newIntervalValue) && newIntervalValue > 0) {
      let newInterval;

      if (newIntervalUnit === 'hour' || newIntervalUnit === 'hours') {
        newInterval = newIntervalValue * 60 * 60 * 1000; // Convert hours to milliseconds
        const unit = newIntervalValue === 1 ? 'hour' : 'hours';
        api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗂𝗇𝗍𝖾𝗋𝗏𝖺𝗅 𝗍𝗂𝗆𝖾 𝗌𝖾𝗍 𝗍𝗈 《${newIntervalValue}》 《${unit}》`, threadID);
      } else if (newIntervalUnit === 'minute' || newIntervalUnit === 'minutes') {
        newInterval = newIntervalValue * 60 * 1000; // Convert minutes to milliseconds
        const unit = newIntervalValue === 1 ? 'minute' : 'minutes';
        api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗂𝗇𝗍𝖾𝗋𝗏𝖺𝗅 𝗍𝗂𝗆𝖾 𝗌𝖾𝗍 𝗍𝗈 《${newIntervalValue}》 《${unit}》`, threadID);
      } else {
        api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗎𝗇𝗂𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 "𝗆𝗂𝗇𝗎𝗍𝖾𝗌" 𝗈𝗋 "𝗁𝗈𝗎𝗋𝗌".', threadID);
        return;
      }

      shotiAutoInterval[threadID] = newInterval;
    } else {
      api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗂𝗇𝗍𝖾𝗋𝗏𝖺𝗅 𝗍𝗂𝗆𝖾. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝖾 𝗇𝗎𝗆𝖻𝖾𝗋.', threadID);
    }
    return;
  } else if (commandArgs[1] === 'interval') {
    const currentInterval = shotiAutoInterval[threadID] || defaultInterval;
    const unit = currentInterval === 60 * 60 * 1000 ? 'hour' : 'minute';
    api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝗂𝗇𝗍𝖾𝗋𝗏𝖺𝗅 𝗍𝗂𝗆𝖾 𝗂𝗌 𝗌𝖾𝗍 𝗍𝗈 ${currentInterval / (unit === 'hour' ? 60 * 60 * 1000 : 60 * 1000)} ${unit}.`, threadID);
    return;
  } else if (commandArgs[1] === 'on') {
    if (!shotiAutoState[threadID]) {
      shotiAutoState[threadID] = true;
      const intervalUnit = shotiAutoInterval[threadID] ? (shotiAutoInterval[threadID] === 60 * 60 * 1000 ? 'hour' : 'minute') : 'hour';
      const intervalValue = shotiAutoInterval[threadID] ? shotiAutoInterval[threadID] / (intervalUnit === 'hour' ? 60 * 60 * 1000 : 60 * 1000) : 1;
      const intervalMessage = `𝗐𝗂𝗅𝗅 𝗌𝖾𝗇𝖽 𝗏𝗂𝖽𝖾𝗈 𝖾𝗏𝖾𝗋𝗒 ${intervalValue} ${intervalUnit}${intervalValue === 1 ? '' : '𝗌'}`;

      api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝖾𝖺𝗍𝗎𝗋𝖾 𝗂𝗌 𝗇𝗈𝗐 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝗇, ${intervalMessage}.`, threadID);

      shoticron(api, event, threadID);

      setInterval(() => {
        if (shotiAutoState[threadID]) {
          shoticron(api, event, threadID);
        }
      }, shotiAutoInterval[threadID] || defaultInterval);
    } else {
      api.sendMessage('✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝖾𝖺𝗍𝗎𝗋𝖾 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝗇', threadID);
    }
    return;
  } else if (commandArgs[1] === 'off') {
    shotiAutoState[threadID] = false;
    api.sendMessage('🔴 | 𝖬𝖺𝗌𝗍𝖾𝗋,  𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝖾𝖺𝗍𝗎𝗋𝖾 𝗂𝗌 𝗇𝗈𝗐 𝗍𝗎𝗋𝗇𝖾𝖽 𝗈𝖿𝖿', threadID);
    return;
  } else if (commandArgs[1] === 'status') {
    const statusMessage = shotiAutoState[threadID] ? 'on' : 'off';
    const intervalMessage = shotiAutoInterval[threadID] ? `𝖨𝗇𝗍𝖾𝗋𝗏𝖺𝗅 𝗍𝗂𝗆𝖾 𝗌𝖾𝗍 𝗍𝗈 ${shotiAutoInterval[threadID] / (shotiAutoInterval[threadID] === 60 * 60 * 1000 ? 60 : 1000)} 𝗆𝗂𝗇𝗎𝗍𝖾𝗌.` : '𝖨𝗇𝗍𝖾𝗋𝗏𝖺𝗅 𝗍𝗂𝗆𝖾 𝗇𝗈𝗍 𝗌𝖾𝗍. 𝖴𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖽𝖾𝖿𝖺𝗎𝗅𝗍 𝟣 -𝗁𝗈𝗎𝗋 𝗂𝗇𝗍𝖾𝗋𝗏𝖺𝗅.';
        const errorMessage = lastVideoError[threadID] ? `𝖫𝖺𝗌𝗍 𝗏𝗂𝖽𝖾𝗈 𝖾𝗋𝗋𝗈𝗋: ${lastVideoError[threadID]}` : '';

        api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝖾𝖺𝗍𝗎𝗋𝖾 𝗂𝗌 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 ${statusMessage}.\n━━━━━━━━━━━━━━━━━━━\n✅ | 𝗧𝗼𝘁𝗮𝗹 𝘃𝗶𝗱𝗲𝗼𝘀 𝘀𝗲𝗻𝘁: ${videoCounter}\n❎| 𝖳𝗈𝗍𝖺𝗅 𝖾𝗋𝗋𝗈𝗋 𝗏𝗂𝖽𝖾𝗈𝗌: ${errorVideoCounter}\n━━━━━━━━━━━━━━━━━━━\n${errorMessage}`, threadID);
        return;
      } else if (commandArgs[1] === 'resetcount') {
        // Check if the user has permission to reset counts
        if (event.senderID === allowedAdminUID) {
          videoCounter = 0;
          errorVideoCounter = 0;
          api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗏𝗂𝖽𝖾𝗈 𝖼𝗈𝗎𝗇𝗍𝗌 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗋𝖾𝗌𝖾𝗍.', threadID);
        } else {
          api.sendMessage('⚠️ | 𝖬𝖺𝗌𝗍𝖾𝗋 , 𝗒𝗈𝗎 𝖽𝗈 𝗇𝗈𝗍 𝗁𝖺𝗏𝖾 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇 𝗍𝗈 𝗋𝖾𝗌𝖾𝗍 𝖼𝗈𝗎𝗇𝗍𝗌.', threadID);
        }
        return;
      }

      api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝗨𝘀𝗮𝗴𝗲:\n"𝗌𝗁𝗈𝗍𝗂𝖼𝗋𝗈𝗇 𝗈𝗇", "𝗌𝗁𝗈𝗍𝗂𝖼𝗋𝗈𝗇 𝗈𝖿𝖿" - 𝗍𝗈 𝗍𝗎𝗋𝗇 𝖮𝖭 𝗈𝗋 𝗍𝗎𝗋𝗇 𝖮𝖥𝖥.\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝗨𝘀𝗮𝗴𝗲:\n"𝗌𝗁𝗈𝗍𝗂𝖼𝗋𝗈𝗇 𝗌𝖾𝗍𝗂𝗇𝗍𝖾𝗋𝗏𝖺𝗅 <𝗆𝗂𝗇𝗎𝗍𝖾𝗌/𝗁𝗈𝗎𝗋𝗌>" - 𝗌𝖾𝗍 𝗍𝗁𝖾 𝗍𝗂𝗆𝖾𝗋 𝖿𝗈𝗋 𝗏𝗂𝖽𝖾𝗈\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝗨𝘀𝗮𝗴𝗲:\n"𝗌𝗁𝗈𝗍𝗂𝖼𝗋𝗈𝗇 𝗂𝗇𝗍𝖾𝗋𝗏𝖺𝗅" - 𝖼𝗁𝖾𝖼𝗄 𝗍𝗁𝖾 𝗂𝗇𝗍𝖾𝗋𝗏𝖺𝗅\n━━━━━━━━━━━━━━━━━━━\n🎓 | 𝗨𝘀𝗮𝗴𝗲:\n"𝗌𝗁𝗈𝗍𝗂𝖼𝗋𝗈𝗇 𝗌𝗍𝖺𝗍𝗎𝗌" - 𝖼𝗁𝖾𝖼𝗄 𝗍𝗁𝖾 𝗌𝗍𝖺𝗍𝗎𝗌 𝗈𝖿𝖿 𝖼𝗈𝗆𝗆𝖺𝗇𝖽', threadID);
      };
