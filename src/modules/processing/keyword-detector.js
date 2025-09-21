/**David Caldwell, Lizard-bot, This is the implementation for key word detection.
 * Retreives keywords from database. Takes string input parameter.
 * Search for keywords. Provides clear output what keywords found and how many. 
 */


function detectWord(text,keyword) {
    return text.content.toLowerCase().includes(keyword)
};

module.exports = { 
    detectWord
};