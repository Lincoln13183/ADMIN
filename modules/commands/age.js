module.exports.config = {
  name: "age",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Calculate your age based on your birthday.",
  commandCategory: "calculate",
  cooldowns: 5,
  usages: "[YYYY-MM-DD]",
};

module.exports.run = function ({ api, event, args }) {
  const birthday = args[0];

  if (!birthday) {
    return api.sendMessage("ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗒𝗈𝗎𝗋 𝖻𝗂𝗋𝗍𝗁𝖽𝖺𝗒 𝗂𝗇 《𝖸𝖸𝖸𝖸-𝖬𝖬-𝖣𝖣》 𝖿𝗈𝗋𝗆𝖺𝗍.", event.threadID);
  }

  const currentDate = new Date();
  const birthDate = new Date(birthday);
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const isBeforeBirthday = currentDate.getMonth() < birthDate.getMonth() ||
                           (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());

  const finalAge = isBeforeBirthday ? age - 1 : age;

  api.sendMessage(`📇 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎𝗋 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝖺𝗀𝖾 𝗂𝗌 ${finalAge}, 𝗆𝗈𝗋𝖾 𝗒𝖾𝖺𝗋𝗌 𝗍𝗈 𝖼𝗈𝗆𝖾, 𝗅𝗂𝗏𝖾 𝗅𝗈𝗇𝗀 𝗌𝖾𝗇𝗌𝖾𝗂 🧡`, event.threadID);
};
