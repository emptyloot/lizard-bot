/**David Caldwell, Lizard-bot, This is the implementation for key word detection.
 * Retreives keywords from database. Takes string input parameter.
 * Search for keywords. Provides clear output what keywords found and how many. 
 */

class KeywordDetector {

    constructor(database) {
        //Take in the database info
    };

    async setKeyword() {
        //Sets the keywords being detected with rules such as case sensitive.
    };

    async validateMessage() {
        // validates message is not from a bot, or is an immage or website.
    };

    async detectKeyword(message) {
        //Detects the keyword in the message
    };
    
};

function detectWord(text,keyword) {
    //Stand alone function
    return text.content.toLowerCase().includes(keyword)
};

module.exports = { 
    KeywordDetector,
    detectWord
};