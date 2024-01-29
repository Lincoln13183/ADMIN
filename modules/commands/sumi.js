const axios = require('axios');

module.exports.config = {
  name: "sumi",
  version: "2.3.0",
  credits: "akhirokiyoshi api by lian",
  hasPermission: 0,
  commandCategory: "utility",
  usage: "[ prefix ]sumi [prompt]",
  usePrefix: true,
  cooldown: 0
};

module.exports.run = async ({ api, event, args }) => {
  api.sendMessage("Sumi is answering to your question!", event.threadID);
  try {
    const response = await axios.get(`https://lianeapi.onrender.com/ask/sumi?query=${args.join(" ")}`);
    api.sendMessage(response.data.message, event.threadID, () => null, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("Oops! Something went wrong. Please try again later. ", event.threadID);
  }
};