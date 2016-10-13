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
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("Hello World");
});

var grammar = tracery.createGrammar({
  'animal': ['panda','fox','capybara','iguana'],
  'emotion': ['sad','happy','angry','jealous'],
  'origin':['I am #emotion.a# #animal#.'],
});

grammar.addModifiers(tracery.baseEngModifiers); 

console.log(grammar.flatten('#origin#'));