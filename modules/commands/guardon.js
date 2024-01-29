module.exports.config = {
  name: 'guardon',
  version: '1.0.0',
  hasPermssion: 2,
  credits: 'yukihiraXhydrogen',
  description: 'guard on',
  usePrefix: true,
  commandCategory: 'profile only',
  usages: 'profile guard on',
  cooldowns: 5,
};

module.exports.run = async ({ api, args, event }) => {
  const botID = event.senderID;

  if (!args[0] || !["on", "off"].includes(args[0])) {
    return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗒 𝖻𝗒 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝗐𝗈𝗋𝖽 "𝗈𝗇" 𝗈𝗋 "𝗈𝖿𝖿" 𝗍𝗈 𝖾𝗇𝖺𝖻𝗅𝖾 𝗈𝗋 𝖽𝗂𝗌𝖺𝖻𝗅𝖾 𝗍𝗁𝖾 𝖺𝗏𝖺𝗍𝖺𝗋 𝖻𝗈𝗍 𝗌𝗁𝗂𝖾𝗅𝖽.', event.threadID);
  }

  const isShielded = args[0] === 'on';

  const form = {
    av: botID,
    variables: JSON.stringify({
      "0": {
        is_shielded: isShielded,
        actor_id: botID,
        client_mutation_id: Math.floor(Math.random() * 20)
      }
    }),
    doc_id: "100088462039646"
  };

  try {
    const response = await api.sendMessage({
      body: '',
      mentions: [{
        tag: '@fbid',
        id: botID
      }]
    }, event.threadID);

    if (response && response.messageID) {
      form.message_id = response.messageID;

      const res = await api.graphql(form);
      const success = res?.data?.[0]?.is_shielded === isShielded;

      const status = isShielded ? '𝖾𝗇𝖺𝖻𝗅𝖾𝖽' : '𝖽𝗂𝗌𝖺𝖻𝗅𝖾𝖽';
      const replyMessage = success ? `✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝖺𝗏𝖺𝗍𝖺𝗋 𝖻𝗈𝗍 𝗌𝗁𝗂𝖾𝗅𝖽 𝗐𝖺𝗌 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 ${status}.` : '❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾𝗌 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗍𝗈 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽. 𝖸𝗈𝗎 𝗆𝖺𝗒 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.';
      api.sendMessage(replyMessage, event.threadID);
    } else {
      api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾𝗌 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID);
    }
  } catch (error) {
    api.sendMessage('❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾𝗌 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID);
  }
};
