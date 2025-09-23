/* David Caldwell
Test file for Keyword-Detector. Basic functions. Partial matches. Multiple Matches. Error handling. Change keyword.
*/
const KeywordDetector = require('../../src/modules/processing/keyword-detector.js');
const {detectWord} = require('../../src/modules/processing/keyword-detector.js')

describe('Detect Keyword', () => {
    describe('Function detectWord', () => {
        test('should not match empty string', () => {
            const message = {content: ''};
            const result = detectWord(message,"lizard");
            expect(result).toBe(false);
        })
        test('should not match different word', () => {
            const message = {content: 'drazzil'};
            const result = detectWord(message,"lizard");
            expect(result).toBe(false);
        })
        test('should not match similar word', () => {
            const message = {content: 'blizard'};
            const result = detectWord(message,"lizard");
            expect(result).toBe(false);
        })
        test('should  match same word', () => {
            const message = {content: 'lizard'};
            const result = detectWord(message,"lizard");
            expect(result).toBe(true);
        })
        test('should  match same word in string', () => {
            const message = {content: 'I am a lizard star.'};
            const result = detectWord(message,"lizard");
            expect(result).toBe(true);
        })
    })
})
