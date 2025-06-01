const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'your-server.aternos.me', // Replace with your Aternos IP
    port: 25565,
    username: 'AFK_Bot_01',         // Any name (for cracked servers)
    auth: 'offline'
  });

  bot.once('spawn', () => {
    console.log('✅ Bot has joined the server.');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.warn('⚠️ Disconnected. Attempting reconnect...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('❌ Bot encountered an error:', err.message);
  });
}

startBot();