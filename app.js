//Get Started with Microsoft Bot Framework in Node.js code at docs.botframework.com 
//Add your requirements (as seen in package.json).
//These dependencies are installed through Node.js command prompt with commands:
//npm install --save tracery-grammar
var restify = require('restify'); 
var builder = require('botbuilder'); 
var tracery = require('tracery-grammar');

// Setup Restify Server
//"npm install --save restify" sets up a server to host your bot online.
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

//Direct to index.html web page
server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));
  
// Create chat bot
//Generate your appId and appPassword by registering a bot: dev.botframework.com 
var connector = new builder.ChatConnector({
    appId: process.env.MY_APP_ID,
    appPassword: process.env.MY_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Tracery Grammar
//=========================================================
//A grammar is a key-value storage system for rules.
var grammar = tracery.createGrammar({
//Each symbol should be followed by an array of text strings representing rules
  'noun': ['growth strategies','scenarios','takeaways','frameworks','methodologies','technologies','innovations','metrics','cloud solutions'],
//or, if you're writing a long string of single words, you can use 'split'
  'verb': 'administrate empower engage envision dominate leverage provide grow bring capitalize foster synergize unleash maximize'.split(' '),
  'adverb': 'organically completely efficiently dramatically professionally dynamically objectively collaboratively seamlessly'.split(' '),
  'adjective': 'agile robust iterative cutting-edge collaborative disruptive win-win cross-platform streamlined key self-sustaining extensible'.split(' '),  
  'preposition': ['via','with','from','on','with','for','of','in','inside of','without','after','vis-a-vis','through','within','out of'],
//Expansion symbols can have modifiers. Modifiers can change something about the string expansion of that symbol.
  'origin':['#adverb.capitalize# #verb# #adjective# #noun# #preposition# #adjective# #noun#.'],
});

grammar.addModifiers(tracery.baseEngModifiers); 

console.log(grammar.flatten('#origin#'));

//=========================================================
// Bots Dialog
//=========================================================

bot.dialog('/', function (session) {
    session.send(grammar.flatten('#origin#'));
});

