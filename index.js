const bot = mineflayer.createBot({
  host: 'vanirmcpe.aternos.me',
  port: 20540,
  username: 'vanir',
  auth: 'offline',
  version: '1.21.5' // ✅ exact version required
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
