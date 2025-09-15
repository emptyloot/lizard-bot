# Lizard Bot

A Discord bot that responds with "lizard" whenever someone mentions the word "lizard".

## Quick Start

### Prerequisites
- Node.js 18+ 
- Discord account

### Setup

1. **Clone and install**
   ```bash
   git clone <your-repo-url>
   cd lizard-bot
   npm install
   ```

2. **Create Discord bot**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create new application → Bot
   - Copy bot token
   - Enable "Message Content Intent"

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your bot token:
   ```
   DISCORD_BOT_TOKEN=your_bot_token_here
   ```

4. **Invite bot to server**
   - In Developer Portal: OAuth2 → URL Generator
   - Select: `bot` scope + `View Channels`, `Send Messages`, `Read Message History` permissions
   - Use generated URL to invite bot to your test server

5. **Run bot**
   ```bash
   npm run dev
   ```

### Test It
Type "lizard" in any channel → bot responds with "lizard"

### Stop Bot
Press `Ctrl+C`

---

**That's it!** You now have a working Discord bot. Check the issues/project board for next development steps.