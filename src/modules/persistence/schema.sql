-- Trigger Words Table  
-- Simple list of words to detect and respond to
CREATE TABLE trigger_words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT UNIQUE NOT NULL,           -- The word/phrase to detect
    response TEXT DEFAULT 'lizard',      -- What to respond with
    enabled BOOLEAN DEFAULT 1,          -- Word active/inactive
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Channel Cooldowns Table
-- Tracks cooldowns per channel, auto-expires after 3 seconds
CREATE TABLE channel_cooldowns (
    channel_id TEXT PRIMARY KEY,        -- Discord channel ID
    last_response_at DATETIME DEFAULT CURRENT_TIMESTAMP -- When bot last responded
);

-- Auto-cleanup trigger: Remove cooldown entries older than 3 seconds
-- This trigger runs BEFORE any SELECT query on channel_cooldowns
CREATE TRIGGER cleanup_expired_cooldowns 
    BEFORE SELECT ON channel_cooldowns
BEGIN
    DELETE FROM channel_cooldowns 
    WHERE datetime(last_response_at, '+3 seconds') < datetime('now');
END;

-- Index for performance
CREATE INDEX idx_trigger_words_enabled ON trigger_words(enabled);

-- Insert default trigger word
INSERT INTO trigger_words (word, response) VALUES ('lizard', 'lizard');