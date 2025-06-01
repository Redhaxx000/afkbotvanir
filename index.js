const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'vanirmcpe.aternos.me', // 🔁 Replace with your Aternos server address
    port: 20540,                    // 🔁 Replace with your server's current port
    username: 'vanir',         // You can customize this name
    auth: 'offline',                // For cracked/offline servers
    version: '1.21.5'               // ✅ Exact version from Aternos
  });

  bot.once('spawn', () => {
    console.log('✅ Bot has joined the server.');

    // Jump every 10 seconds to avoid AFK kick
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.warn('⚠️ Bot disconnected. Reconnecting in 5s...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('❌ Bot error:', err.message);
    if (err.code === 'ECONNREFUSED' || err.message.includes('EPIPE')) {
      console.log('🔁 Retrying in 15s...');
      setTimeout(startBot, 15000);
    }
  });
}

startBot();
