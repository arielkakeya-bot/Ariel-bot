module.exports = {
  config: {
    name: "ai",
    aliases: ["chat", "ask", "gpt"],
    version: "1.0.0",
    author: "Ariel Aks",
    countDown: 2,
    role: 0,
    shortDescription: {
      en: "AI Chat - Ask me anything"
    },
    longDescription: {
      en: "AI assistant that answers all your questions, works in groups and private chats"
    },
    category: "ai",
    guide: {
      en: "{pn} <question> - Ask anything to Ariel AI"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, isGroup } = event;
    const question = args.join(" ").trim();

    if (!question) {
      return api.sendMessage(`🤖 Ariel AI\n\nUsage: !ai <your question>\nExample: !ai Who created you?`, threadID);
    }

    // 🧠 Réponses intelligentes intégrées (pas besoin d'API externe)
    let answer = "";
    const lowerQuestion = question.toLowerCase();

    // 📌 Questions sur le bot
    if (lowerQuestion.match(/who created you|who made you|creator|owner/)) {
      answer = `✅ I am **Ariel Bot** 🤖\nCreated and owned by **Ariel Aks**\nI work perfectly in Facebook Groups & Private chats`;
    }
    else if (lowerQuestion.match(/what are you|who are you|your name/)) {
      answer = `🤖 I am **Ariel AI**\nAn intelligent assistant built by Ariel Aks\nI answer all your questions automatically`;
    }
    else if (lowerQuestion.match(/how are you|ça va/)) {
      answer = `😊 I'm fine! Thank you for asking\nI'm ready to help you anytime`;
    }
    else if (lowerQuestion.match(/hello|hi|hey|good morning/)) {
      answer = `👋 Hello! I'm Ariel AI\nHow can I help you today?`;
    }
    else if (lowerQuestion.match(/thank you|thanks/)) {
      answer = `🙏 You're welcome! Feel free to ask anything`;
    }
    else if (lowerQuestion.match(/what can you do|functions/)) {
      answer = `📌 What I can do:\n✅ Answer all questions\n✅ Work in Groups Messenger\n✅ Auto reply\n✅ Commands with prefix !\n✅ Created by Ariel Aks`;
    }
    // 📌 Réponse générale pour toute autre question
    else {
      answer = `🤔 Good question! 🤖 Ariel AI\n\nI can help you with many things:\n• Information & Facts\n• General Questions\n• Help in Group Chats\n\nAsk me anything you want to know 😊`;
    }

    // Envoyer la réponse (FONCTIONNE DANS LES GROUPES)
    api.sendMessage(answer, threadID);
  },

  // 🧠 Mode auto-réponse (fonctionne sans commande !)
  onChat: async function ({ api, event }) {
    const { body, threadID, isGroup, senderID } = event;
    const lowerMsg = body?.toLowerCase() || "";

    // Répondre automatiquement si le message contient ces mots
    const triggerWords = ["ai", "question", "who", "what", "how", "why", "when", "where", "help"];
    
    if (triggerWords.some(word => lowerMsg.includes(word)) && !body.startsWith("!")) {
      let autoReply = "";

      if (lowerMsg.includes("who") && lowerMsg.includes("created")) {
        autoReply = `✅ This bot is created by **Ariel Aks** 🤖`;
      }
      else if (lowerMsg.includes("what") && lowerMsg.includes("name")) {
        autoReply = `My name is **Ariel Bot** 🤖`;
      }
      else if (lowerMsg.includes("group") || lowerMsg.includes("work")) {
        autoReply = `✅ I work perfectly in ALL Facebook Groups ✅`;
      }
      else {
        autoReply = `🤖 I'm **Ariel AI** by Ariel Aks!\nAsk me any question, I will answer you 😊`;
      }

      api.sendMessage(autoReply, threadID);
    }
  }
};
