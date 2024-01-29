async function getUserName(api, senderID) { 
  try { 
    const userInfo = await api.getUserInfo(senderID); 
    return userInfo[senderID]?.name || "User"; 
  } catch (error) { 
    console.log(error); 
    return "User"; 
  } 
}

var chat = {};

module.exports.config = { 
  name: "chat", 
  version: "2.3.0", 
  credits: "jonell", 
  hasPermission: 0, 
  commandCategory: "Risk", 
  usage: "[on/off]", 
  usePrefix: true, 
  cooldown: 5, 
};

module.exports.run = async function ({ api, event, target }) { 
  const { writeFileSync } = require("fs"); 
  const path = __dirname + "/cache/chat.json";

  if (!(String(event.threadID) in chat)) chat[String(event.threadID)] = false;

  const threadInfo = await api.getThreadInfo(event.threadID); 
  const isAdmin = threadInfo.adminIDs.some((adminInfo) => adminInfo.id === event.senderID); 
  const isUserAdmin = (await api.getThreadInfo(event.threadID)).adminIDs.some((idInfo) => idInfo.id === event.senderID);

  if (!isAdmin || !isUserAdmin) { 
    return api.sendMessage( 
      "🛡️ | You're not able to use chat off or on commands because you are not an admin in this group chat", 
      event.threadID,
      event.messageID 
    ); 
  }

  if (isAdmin) { 
    if (target[0] === "off") { 
      chat[String(event.threadID)] = true; 
      writeFileSync(path, JSON.stringify(chat), "utf-8"); 
      return api.sendMessage( 
        "🛡️ | Chat off has been Activated. The bot will now remove non-admin members from the group when they chat.", 
        event.threadID 
      ); 
    } else if (target[0] === "on") { 
      chat[String(event.threadID)] = false; 
      writeFileSync(path, JSON.stringify(chat), "utf-8"); 
      return api.sendMessage( 
        "✅ | Chat off has been Deactivated. The bot will no longer remove members when they chat.", 
        event.threadID 
      ); 
    } else { 
      return api.sendMessage('Use the command "chat on" to enable or "chat off" to disable chat.', event.threadID); 
    } 
  } else { 
    return api.sendMessage("Admin privilege is required to change chat settings.", event.threadID); 
  } 
};