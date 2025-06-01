const bot = mineflayer.createBot({
  host: 'vanirmcpe.aternos.me',
  port: 20540,
  username: 'vanir',
  auth: 'offline',
  version: '1.21.5' // ✅ specify latest version
});
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
