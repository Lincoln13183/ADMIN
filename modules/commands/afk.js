module.exports.config = {
  name: "afk",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "AFK!",
  commandCategory: "system",
  usages: "[reason]",
  cooldowns: 5
};
module.exports.run = async ({ event: e, api: w, args: b }) => {
  const { threadID: t, messageID: n, senderID: c } = e;
  if (!global.afk) { global.afk = new Map() }
  if(global.afk.has(t) == false) { global.afk.set(t, { v: [] }) }
  var h = global.afk.get(t)
  var r = b.join(' ') || 'why?'
  h.v.push({ c, r,  p: 1, v: [] })
  global.afk.set(t, h)
  return w.sendMessage(`🔰 | 𝖠𝖥𝖪 𝖾𝗇𝖺𝖻𝗅𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒!\n𝗪𝗵𝘆: ${r}`, t, n);
}
module.exports.handleEvent = async function ({ event: e, api: w, Users }) {
  const { threadID: t, messageID: n, senderID: c, body: y } = e;
  if(!global.afk) return
  var q = global.afk.get(t);
  if(!q) return;
  var a = Object.keys(e.mentions);
  if(a.length !== 0) {
      var k = []
      for (let i of a) {
          var g = q.v.some(h => h.c == i);
          if(g == true) {
              var s = q.v.find(d => d.c == i)
              w.sendMessage(`ℹ️ | 𝖲𝖾𝗇𝗌𝖾𝗂 ${(await Users.getData(i)).name}, 𝖻𝗎𝗌𝗒 𝗐𝗂𝗍𝗁 𝗋𝖾𝖺𝗌𝗈𝗇: ${s.r}`, t, n)
              s.v.push({
                  c: c,
                  y: y
              })
          }
      }
  }
  var x = q.v.some(z => z.c == c);
  var u = q.v.find(z => z.c == c);
  if(u !== undefined) {
      if(x == true && u.p == 0) {
          var m = `✌️ | 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝖻𝖺𝖼𝗄 𝗌𝖾𝗇𝗌𝖾𝗂\n`
          m+= `🗳 | 𝖧𝖺𝗏𝖾 《${u.v.length}》 𝗐𝗁𝗈 𝗍𝖺𝗀𝗀𝖾𝖽 𝗒𝗈𝗎 𝗐𝗁𝗂𝗅𝖾 𝗒𝗈𝗎 𝗐𝖾𝗋𝖾 𝖺𝖿𝗄\n------------------\n`
          for(let i of u.v) {
              m+= `👤 | 𝗡𝗮𝗺𝗲: ${(await Users.getData(i.c)).name}\n👁 | 𝗖𝗼𝗻𝘁𝗲𝗻𝘁: ${i.y}\n\n`
          }
          m += ``
          var i = q.v.findIndex(f => f.c == c);
          q.v.splice(i, 1)
          global.afk.set(t, q);
          return w.sendMessage(`[======𝗔𝗙𝗞======]\n${m}`, t, n);
      }
      u.p = 0
      global.afk.set(t, q);
  }
}