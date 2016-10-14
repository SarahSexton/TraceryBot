// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 
var tracery = require('tracery-grammar');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MY_APP_ID,
    appPassword: process.env.MY_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Tracery Grammar // I am #emotion.a# #animal#.
//=========================================================
var grammar = tracery.createGrammar({
  'adjective': ['agile','robust','iterative','corporate','collaborative','overall','holistic','disruptive','win-win'],
  'adverb': ['organically','completely','efficiently','quickly','dramatically','professionally','dynamically'],
  'noun': ['growth strategies','capital','intellectual capital','portals','methodologies','technology'],
  'preposition': ['via','with','from','on','along','for','of','at','toward','in','inside of','without','after','vis-a-vis','through','within'],
  'verb': ['administrate','empower','network with','predominate','engage','envision'],
  'origin':['#adverb.capitalize# #verb# #adjective# #noun# #preposition# #adjective# #noun#.'],
});

grammar.addModifiers(tracery.baseEngModifiers); 

console.log(grammar.flatten('#origin#'));

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send(grammar.flatten('#origin#'));
});

