'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');


// This file defines example fulfillment logic:
// a. When Dialogflow intents are triggered, the intent's action name (declared in the action area of the intent) is provided to you in the request to your fulfillment. You use this action name to determine what logic to carry out.
const NAME_ACTION = 'make_name';

// Within every request to your fulfillment, if Dialogflow parsed parameters from the user input, you can access the parameter by name. Here, you declare the names of the parameters, so you can access them later.
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';

// c. This function fulfills the action by generating a silly name. It's called whenever the make_name intent is triggered. It uses the parameters from the user input to generate the name.


// d. Action maps in the Node.js client library let you map intent names to functions, so that when your fulfilment receives a request, a function can automatically be called based on the action name. You use the action name variable that you declared earlier and map that name to the make_name function.
exports.sillyNameMaker = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

// c. The function that generates the silly name
function makeName (app) {
  let number = app.getArgument(NUMBER_ARGUMENT);
  let color = app.getArgument(COLOR_ARGUMENT);

  app.tell('Alright, your silly name is ' +
    color + ' ' + number +
    '! I hope you like it. See you next time.'); // Speak Google!
}

  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);

  app.handleRequest(actionMap);
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
