'use strict';
var Alexa = require('alexa-sdk');
const Swagger = require('swagger-client');

var APP_ID = "amzn1.ask.skill.35b2af88-ec91-47f7-b442-8a354575ec9e";
var SKILL_NAME = "Word of the Day";
var GET_WORD_MESSAGE = "Here is your word: ";
var HELP_MESSAGE = "You can say give me a word, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewWordIntent');
    },
    'GetNewFactIntent': function () {
        var newWord = fetchRandomWord();
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};

var fetchRandomWord() {
  var request = {
    'url': 'http://api.wordnik.com:80/v4/words.json/randomWords'
    'query': { 'hasDictionary': true, 'limit': 1, 'api_key': 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'},
    'method': 'get'
  }

  // https://developer.amazon.com/blogs/post/Tx3DVGG0K0TPUGQ/New-Alexa-Skills-Kit-Template:-Step-by-Step-Guide-to-Build-a-Fact-Skill
  // NEED API TO CONTINUE
  // http://developer.wordnik.com/
  // https://github.com/swagger-api/swagger-js
  Swagger().http(request)
  .then((res) => {
    res.statusCode // status code
    res.statusText // status text, ie: "Not Found"
    res.body       // JSON object or undefined
    res.obj        // same as above, legacy
    res.text       // textual body, or Blob
    res.headers    // header hash
  })
  .catch((err) => {

  })
}
