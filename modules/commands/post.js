module.exports.config = {
  name: "post",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "NTKhang",
  description: "Create a new post in acc bot",
  commandCategory: "𝖠𝖽𝗆𝗂𝗇",
  cooldowns: 5
};

module.exports.run = async ({ event, api }) => {
  const { threadID, messageID, senderID } = event;
  const uuid = getGUID();
  const formData = {
    "input": {
      "composer_entry_point": "inline_composer",
      "composer_source_surface": "timeline",
      "idempotence_token": uuid + "_FEED",
      "source": "WWW",
      "attachments": [],
      "audience": {
        "privacy": {
          "allow": [],
          "base_state": "FRIENDS", // SELF EVERYONE
          "deny": [],
          "tag_expansion_state": "UNSPECIFIED"
        }
      },
      "message": {
        "ranges": [],
        "text": ""
      },
      "with_tags_ids": [],
      "inline_activities": [],
      "explicit_place_id": "0",
      "text_format_preset_id": "0",
      "logging": {
        "composer_session_id": uuid
      },
      "tracking": [
        null
      ],
      "actor_id": api.getCurrentUserID(),
      "client_mutation_id": Math.floor(Math.random()*17)
    },
    "displayCommentsFeedbackContext": null,
    "displayCommentsContextEnableComment": null,
    "displayCommentsContextIsAdPreview": null,
    "displayCommentsContextIsAggregatedShare": null,
    "displayCommentsContextIsStorySet": null,
    "feedLocation": "TIMELINE",
    "feedbackSource": 0,
    "focusCommentID": null,
    "gridMediaWidth": 230,
    "groupID": null,
    "scale": 3,
    "privacySelectorRenderLocation": "COMET_STREAM",
    "renderLocation": "timeline",
    "useDefaultActor": false,
    "inviteShortLinkKey": null,
    "isFeed": false,
    "isFundraiser": false,
    "isFunFactPost": false,
    "isGroup": false,
    "isTimeline": true,
    "isSocialLearning": false,
    "isPageNewsFeed": false,
    "isProfileReviews": false,
    "isWorkSharedDraft": false,
    "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
    "hashtag": null,
    "canUserManageOffers": false
  };

  return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝗈𝗈𝗌 𝖺𝗇 𝖺𝗎𝖽𝗂𝖾𝗇𝖼𝖾 𝗍𝗁𝖺𝗍 𝖼𝖺𝗇 𝗌𝖾𝖾 𝗍𝗁𝗂𝗌 𝖺𝗋𝗍𝗂𝖼𝗅𝖾 𝗈𝖿 𝗒𝗈𝗎𝗋𝗌.\n\n1. 𝗘𝘃𝗲𝗿𝘆𝗼𝗻𝗲\n
 • 𝖤𝗏𝖾𝗋𝗒𝗈𝗇𝖾 𝖼𝖺𝗇 𝗌𝖾𝖾 𝗒𝗈𝗎𝗋 𝗉𝗈𝗌𝗍\n\n2. 𝗙𝗿𝗶𝗲𝗻𝗱\n
 • 𝖮𝗇𝗅𝗒 𝗒𝗈𝗎𝗋 𝖿𝗋𝗂𝖾𝗇𝖽𝗌 𝗂𝗇 𝗒𝗈𝗎𝗋 𝖻𝗈𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 𝖼𝖺𝗇 𝗌𝖾𝖾 𝗒𝗈𝗎𝗋 𝗉𝗈𝗌𝗍\n\n3. 𝗢𝗻𝗹𝘆 𝗺𝗲\n
 • 𝖮𝗇𝗅𝗒 𝗒𝗈𝗎 𝖼𝖺𝗇 𝗌𝖾𝖾 𝗍𝗁𝗂𝗌 𝗉𝗈𝗌𝗍.`, threadID, (e, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      author: senderID,
      formData,
      type: "whoSee"
    });
  }, messageID);
};

module.exports.handleReply = async ({ event, api, handleReply }) => {
  const { type, author, formData } = handleReply;
  if (event.senderID != author) return;
  const axios = require("axios");

const fs = require("fs-extra");

  const { threadID, messageID, senderID, attachments, body } = event;
  const botID = api.getCurrentUserID();

  async function uploadAttachments(attachments) {
    let uploads = [];
    for (const attachment of attachments) {
      const form = {
        file: attachment
      };
      uploads.push(api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${botID}&photo_source=57&av=${botID}`, form));
    }
    uploads = await Promise.all(uploads);
    return uploads;
  }

  if (type == "whoSee") {
    if (!["1", "2", "3"].includes(body)) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝖼𝗁𝗈𝗈𝗌𝖾 1 𝗈𝖿 𝗍𝗁𝖾 3 𝖼𝗁𝗈𝗂𝖼𝖾𝗌 𝖺𝖻𝗈𝗏𝖾.', threadID, messageID);
    formData.input.audience.privacy.base_state = body == 1 ? "EVERYONE" : body == 2 ? "FRIENDS" : "SELF";
    api.unsendMessage(handleReply.messageID, () => {
      api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗈𝖿 𝗍𝗁𝖾 𝖺𝗋𝗍𝗂𝖼𝗅𝖾, 𝖺𝗇𝖽 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗅𝖾𝖺𝗏𝖾 𝗂𝗍 𝖻𝗅𝖺𝗇𝗄, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 0.`, threadID, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          formData,
          type: "content"
        });
      }, messageID);
    });
  }
  else if (type == "content") {
    if (event.body != "0") formData.input.message.text = event.body;
    api.unsendMessage(handleReply.messageID, () => {
      api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗉𝗁𝗈𝗍𝗈 ( 𝖸𝗈𝗎 𝖺𝗋𝖾 𝖺𝗅𝗅𝗈𝗐𝖾𝖽 𝗍𝗈 𝗌𝖾𝗇𝖽 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗉𝗁𝗈𝗍𝗈𝗌, 𝗂𝖿 𝗒𝗈𝗎 𝖽𝗈𝗇𝗍 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗉𝗈𝗌𝗍 𝗉𝗂𝖼𝗍𝗎𝗋𝖾𝗌, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗒 0 ).`, threadID, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          formData,
          type: "image"
        });
      }, messageID);
    });
  }
  else if (type == "image") {
    if (event.body != "0") {
      const allStreamFile = [];
      const pathImage = __dirname + `/cache/imagePost.png`;
      for (const attach of attachments) {
        if (attach.type != "photo") continue;
        const getFile = (await axios.get(attach.url, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathImage, Buffer.from(getFile));
        allStreamFile.push(fs.createReadStream(pathImage));
      }
      const uploadFiles = await uploadAttachments(allStreamFile);
      for (let result of uploadFiles) {
        if (typeof result == "string") result = JSON.parse(result.replace("for (;;);", ""));

        formData.input.attachments.push({
          "photo": {
            "id": result.payload.fbid.toString(),
          }
        });
      }
      /*
      for (const path of paths) {
        try {
          fs.unlinkSync(path);
        }
        catch(e) {}
      }
      */
    }
    /*
    api.unsendMessage(handleReply.messageID, () => {
      api.sendMessage(`Bắt đầu tạo bài viết....`, threadID, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          formData,
          type: "video"
        });
      }, messageID);
    });
  }
  else if (type == "video") {

    if (event.body != "0") {
      if (!handleReply.uploadVideos) handleReply.uploadVideos = [];
      const { uploadVideos } = handleReply;
      if (attachments[0].type != "video") return;
      const getFile = (await axios.get(attachments[0].url, { responseType: "arraybuffer" })).data;
      const pathVideo = __dirname + "/cache/videoPost.mp4";
      fs.writeFileSync(pathVideo, Buffer.from(getFile));
      uploadVideos.push(fs.createReadStream(pathVideo));

      return api.unsendMessage(handleReply.messageID, () => {
        api.sendMessage(`Phản hồi tin nhắn này kèm video hoặc reply 0 để kết thúc`, threadID, (e, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: senderID,
            formData,
            uploadVideos,
            type: "video"
          });
        }, messageID);
      });
    }


    if (handleReply.uploadVideos) {
      let uploads = [];
      for (const attachment of handleReply.uploadVideos) {
        const form = {
          upload_1024: attachment,
          voice_clip: "true"
        };
        uploads.push(api.httpPostFormData("https://upload.facebook.com/ajax/mercury/upload.php", form));
      }
      uploads = await Promise.all(uploads);

      for (let result of uploads) {
        if (typeof result == "string") result = JSON.parse(result.replace("for (;;);", ""));
        formData.input.attachments.push({
          "video": {
            "id": result.payload.metadata[0].video_id.toString(),
            "notify_when_processed": true
          }
        });
      }
    }
    */

    const form = {
      av: botID,
      fb_api_req_friendly_name: "ComposerStoryCreateMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "7711610262190099",
      variables: JSON.stringify(formData)
    };

    api.httpPost('https://www.facebook.com/api/graphql/', form, (e, info) => {
      api.unsendMessage(handleReply.messageID);
      try {
        if (e) throw e;
        if (typeof info == "string") info = JSON.parse(info.replace("for (;;);", ""));
        const postID = info.data.story_create.story.legacy_story_hideable_id;
        const urlPost = info.data.story_create.story.url;
        if (!postID) throw info.errors;
        try {
          fs.unlinkSync(__dirname + "/cache/imagePost.png");
          //fs.unlinkSync(__dirname + "/cache/videoPost.mp4");
        }
        catch(e) {}
        return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝗉𝗈𝗌𝗍 𝗐𝖺𝗌 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗂𝗇𝗂𝗍𝗂𝖺𝗍𝖾𝖽, 𝗒𝗈𝗎 𝗆𝖺𝗒 𝗌𝖾𝖾 𝗂𝗍 𝗂𝗇 𝗒𝗈𝗎𝗋 𝖻𝗈𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍\n\n🆔 | 𝗣𝗢𝗦𝗧𝗜𝗗: ${postID}\n\n🔗 | 𝗨𝗥𝗟𝗣𝗢𝗦𝗧: ${urlPost}`, threadID, messageID);
      }
      catch (e) {
        //console.log(e)
        return api.sendMessage(`❎ | 𝖯𝗈𝗌𝗍 𝖼𝗋𝖾𝖺𝗍𝗂𝗈𝗇 𝖿𝖺𝗂𝗅𝖾𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋 𝗆𝖺𝗌𝗍𝖾𝗋.`, threadID, messageID);
      }
    });

  }
};




function getGUID() {
  var sectionLength = Date.now();
  var id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.floor((sectionLength + Math.random() * 16) % 16);
    sectionLength = Math.floor(sectionLength / 16);
    var _guid = (c == "x" ? r : (r & 7) | 8).toString(16);
    return _guid;
  });
  return id;
                                   }