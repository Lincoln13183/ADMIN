const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const substitution = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM';

module.exports.config = {
  name: "cipher",
  version: "2.3.0",
  credits: "cliff",
  hasPermission: 0,
  commandCategory: "utility",
  usage: "",
  usePrefix: true,
  cooldown: 0
};

module.exports.run = async function ({ args, message }) {
  if (args.length < 2) {
    return message.reply("Usage: !cipher <encode/decode> <text>");
  }

  const operation = args[0].toLowerCase();
  const text = args.slice(1).join(" ");

  let result;

  if (operation === "encode") {
    result = encode(text);
  } else if (operation === "decode") {
    result = decode(text);
  } else {
    return message.reply("Invalid operation. Use 'encode' or 'decode'.");
  }

  message.reply(`Result: ${result}`);
};

function encode(text) {
  return text.split('').map(char => {
    const index = alphabet.indexOf(char);
    return index !== -1 ? substitution[index] : char;
  }).join('');
}

function decode(text) {
  return text.split('').map(char => {
    const index = substitution.indexOf(char);
    return index !== -1 ? alphabet[index] : char;
  }).join('');
}
