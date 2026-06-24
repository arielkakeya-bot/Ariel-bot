const { spawn } = require("child_process");
const express = require("express");

const app = express();

// 🌍 Serveur obligatoire pour Render
app.get("/", (req, res) => {
  res.send("🤖 Ariel Bot is Online ✅\nOwner: Ariel Aks\nWorks in Groups & Private");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🌍 Server running on port " + PORT);
});

// 🛡️ Anti-crash protection
process.on("uncaughtException", err => console.error("💥 Error:", err));
process.on("unhandledRejection", err => console.error("💥 Rejection:", err));

// 🚀 Lancement du Bot
function startBot() {
  const child = spawn("node", ["index.js"], {
    stdio: "inherit",
    shell: true
  });

  child.on("close", (code) => {
    console.log("🔁 Bot stopped with code:", code);

    // Redémarre seulement si erreur
    if (code !== 0) {
      setTimeout(() => {
        console.log("♻️ Restarting Ariel Bot...");
        startBot();
      }, 5000);
    }
  });
}

// Démarrer tout
startBot();
