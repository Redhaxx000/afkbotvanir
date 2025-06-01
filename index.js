const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'your-server.aternos.me', // ✅ Replace this with your server IP
    port: 25565,                    // ✅ Replace with your current port
    username: 'AFK_Bot_01',
    auth: 'offline',
    version: '1.20.6'              // ✅ Matches Aternos's latest version
  });

  bot.once('spawn', () => {
    console.log('✅ Bot has joined the server.');
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
