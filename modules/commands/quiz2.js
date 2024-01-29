module.exports.config = {
  name: "quiz2",
  version: "1.0",
  hasPermission: 0,
  credits: "Réynél",
  description: "Answer trivia questions",
  commandCategory: "quiz",
  cooldowns: 5,
};

const axios = require('axios');
const triviaData = {};

const difficultyMap = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
};

const categoryMap = {
  general: 9,
  book: 10,
  books: 10,
  film: 11,
  music: 12,
  theatre: 13,
  theatres: 13,
  television: 14,
  videogame: 15,
  videogames: 15,
  boardgame: 16,
  boardgames: 16,
  science: 17,
  computer: 18,
  computers: 18,
  math: 19,
  mythology: 20,
  sport: 21,
  sports: 21,
  geography: 22,
  history: 23,
  politic: 24,
  politics: 24,
  art: 25,
  celebrity: 26,
  celebrities: 26,
  animal: 27,
  animals: 27,
  vehicle: 28,
  vehicles: 28,
  comic: 29,
  comics: 29,
  gadget: 30,
  gadgets: 30,
  anime: 31,
  cartoon: 32,
};

function getFirstName(fullName) {
  let names = fullName.split(' ');
  return names[0] || fullName;
}

// Function to fetch the user's name based on senderID
async function getUserName(api, senderID) {
  const userInfo = await api.getUserInfo(senderID);
  let user1 = userInfo[senderID].name;
  if (user1) {
    let user = getFirstName(user1);
    return user;
  } else {
    return "Unknown User"; // Return a default name if the user's name is not available
  }
}

// Create a function to reveal the answer
function revealAnswer(api, threadID) {
  if (!triviaData[threadID].answered) {
    const { correctIndex, options } = triviaData[threadID];
    const correctLetter = String.fromCharCode(65 + correctIndex);
    api.sendMessage(`⏱️ | 𝖳𝗂𝗆𝖾'𝗌 𝗎𝗉 𝖲𝖾𝗇𝗌𝖾𝗂! 𝖳𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝖺𝗇𝗌𝗐𝖾𝗋 𝗂𝗌:\n\n${correctLetter}. ${decodeURIComponent(options[correctIndex])}`, threadID);
    triviaData[threadID].answered = true;
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;

  // Clear previous trivia data for this thread
  if (triviaData[threadID]) {
    delete triviaData[threadID];
  }

  try {
    // Parse user input for difficulty and category
    const [difficultyInput, categoryInput] = args.map(arg => arg.toLowerCase());
    const difficulty = difficultyMap[difficultyInput] || ''; // Randomize if not recognized
    const category = categoryMap[categoryInput] || ''; // Default to empty string if not recognized

    if (args[0] == 'help'){
      return api.sendMessage(`𝖲𝖾𝗇𝗌𝖾𝗂, 𝗐𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖢𝗅𝖺𝗋𝗄'𝗌 𝖰𝗎𝗂𝗓!\n\n𝗗𝗶𝗳𝗳𝗶𝗰𝘂𝗹𝘁𝗶𝗲𝘀:\n\n𝖾𝖺𝗌𝗒\n𝗆𝖾𝖽𝗂𝗎𝗆\n𝗁𝖺𝗋𝖽\n\n𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝗶𝗲𝘀:\n\n𝗀𝖾𝗇𝖾𝗋𝖺𝗅\n𝖻𝗈𝗈𝗄𝗌\n𝖿𝗂𝗅𝗆\n𝗆𝗎𝗌𝗂𝖼\n𝗍𝗁𝖾𝖺𝗍𝗋𝖾𝗌\n𝗍𝖾𝗅𝖾𝗏𝗂𝗌𝗂𝗈𝗇\n𝗏𝗂𝖽𝖾𝗈𝗀𝖺𝗆𝖾𝗌\n𝖻𝗈𝖺𝗋𝖽𝗀𝖺𝗆𝖾𝗌\n𝗌𝖼𝗂𝖾𝗇𝖼𝖾\n𝖼𝗈𝗆𝗉𝗎𝗍𝖾𝗋𝗌\n𝗆𝖺𝗍𝗁\n𝗆𝗒𝗍𝗁𝗈𝗅𝗈𝗀𝗒\n𝗌𝗉𝗈𝗋𝗍𝗌\n𝗀𝖾𝗈𝗀𝗋𝖺𝗉𝗁𝗒\n𝗁𝗂𝗌𝗍𝗈𝗋𝗒\n𝗉𝗈𝗅𝗂𝗍𝗂𝖼𝗌\n𝖺𝗋𝗍\n𝖼𝖾𝗅𝖾𝖻𝗋𝗂𝗍𝗒\n𝖺𝗇𝗂𝗆𝖺𝗅𝗌\n𝗏𝖾𝗁𝗂𝖼𝗅𝖾𝗌\n𝖼𝗈𝗆𝗂𝖼𝗌\n𝗀𝖺𝖽𝗀𝖾𝗍𝗌\n𝖺𝗇𝗂𝗆𝖾\n𝖼𝖺𝗋𝗍𝗈𝗈𝗇\n\n𝗨𝘀𝗮𝗴𝗲:\n${global.config.PREFIX}𝗊𝗎𝗂𝗓 [𝖽𝗂𝖿𝖿𝗂𝖼𝗎𝗅𝗍𝗒] [𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒]\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n${global.config.PREFIX}𝗊𝗎𝗂𝗓 𝗆𝖾𝖽𝗂𝗎𝗆 𝗆𝖺𝗍𝗁`, threadID, messageID);
    }

    const response = await axios.get(`https://opentdb.com/api.php?amount=1&type=multiple&encode=url3986&difficulty=${difficulty}&category=${category}`);
    const question = response.data.results[0];

    const displayCategory = question.category;
    const displayDifficulty = question.difficulty;

    const options = [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5);
    const optionsString = options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');

    const questionMessage = `𝗗𝗶𝗳𝗳𝗶𝗰𝘂𝗹𝘁𝘆: ${capitalizeFirstLetter(decodeURIComponent(displayDifficulty))}\n𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${decodeURIComponent(displayCategory).replace(/\bEntertainment: \b/g, '').replace(/\Science: \b/g, '')}\n\n${decodeURIComponent(question.question)}\n\n${decodeURIComponent(optionsString)}`;
    api.sendMessage(questionMessage, threadID);

    triviaData[threadID] = {
      correctIndex: options.indexOf(question.correct_answer),
      answered: false,
      options: options, // Store the options for this question
    };

    // Set a timeout to reveal the answer after 20 seconds
    const timeout = setTimeout(() => {
      revealAnswer(api, threadID);
    }, 30000); // 30000 milliseconds (30 seconds)

    // Reset the timer after every new question
    triviaData[threadID].timeout = timeout;

    api.listenMqtt((_, message) => {
      if (message.body && /^[a-d]$/.test(message.body.toLowerCase()) && !triviaData[threadID].answered) {
        const userAnswer = message.body.toLowerCase();
        const { correctIndex, options } = triviaData[threadID];

        const correctLetter = String.fromCharCode(65 + correctIndex).toLowerCase(); // Normalize the correct answer letter to lowercase

        if (userAnswer === correctLetter) {
          clearTimeout(triviaData[threadID].timeout);

          // Get the sender's name
          getUserName(api, message.senderID)
            .then(senderName => {
              api.sendMessage({
                body: `🎉 | 𝖲𝖾𝗇𝗌𝖾𝗂 ${senderName}, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍! 𝖳𝗁𝖾 𝖺𝗇𝗌𝗐𝖾𝗋 𝗂𝗌:\n\n${userAnswer.toUpperCase()}. ${decodeURIComponent(options[correctIndex])}`,
                mentions: [{
                  tag: senderName,
                  id: message.senderID
                }]
              }, threadID, message.messageID);
            })
            .catch(error => {
              console.error("Error fetching user's name:", error);
            });
        } else {
          clearTimeout(triviaData[threadID].timeout);

          // Get the sender's name
          getUserName(api, message.senderID)
            .then(senderName => {
              api.sendMessage({
                body: `👾 | 𝖲𝗈𝗋𝗋𝗒, 𝖲𝖾𝗇𝗌𝖾𝗂 ${senderName}. 𝖸𝗈𝗎𝗋 𝖺𝗇𝗌𝗐𝖾𝗋 𝗂𝗌 𝗐𝗋𝗈𝗇𝗀. 𝖳𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝖺𝗇𝗌𝗐𝖾𝗋 𝗂𝗌:\n\n${String.fromCharCode(65 + correctIndex)}. ${decodeURIComponent(options[correctIndex])}`,
                mentions: [{
                  tag: senderName,
                  id: message.senderID
                }]
              }, threadID, message.messageID);
            })
            .catch(error => {
              console.error("Error fetching user's name:", error);
            });
        }

        triviaData[threadID].answered = true;
      }
    });
    
  } catch (error) {
    console.error("Error fetching quiz2 question:", error);
    api.sendMessage("❎ | 𝖦𝗈𝗆𝖾𝗇𝗇𝖺𝗌𝖺𝗂 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝗍𝗁𝖾 𝗊𝗎𝗂𝗓𝟤 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.", threadID);
  }
};