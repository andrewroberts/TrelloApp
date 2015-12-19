// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint (this file) - TODO

// Code review all files - TODO
// JSHint review (see files) - TODO
// Unit Tests - TODO
// System Test (Dev) - TODO
// System Test (Prod) - TODO

/**
 * config.gs
 * =========
 *
 * Internal onfiguration settings.
 */

// TODO - postfix local objects with _

// Config
// ------

var SCRIPT_NAME = 'TrelloApp'
var SCRIPT_VERSION = 'v0.2.1'

var PRODUCTION_VERSION = true

// Log Library
// -----------

// This is an dummy version of the Log library (MqTFuiXcPtS5rVUZ_jC9Z4tnfWGfgtIUb) v14
var Log_ = {

  // Functions

  init: function(initOptions) {},
  severe: function(message, options) {},
  warning: function(message, options) {},
  info: function(message, options) {},
  fine: function(message, options) {},
  finer: function(message, options) {},
  finest: function(message, options) {},
  functionEntryPoint: function(message, options) {},
  getLevel: function() {},
  setLevel: function (level) {},
  blConfig: function(message, options) {},
  clear: function() {},
  
  // Enums
  
  DisplayFunctionNames: Object.freeze({
    YES: true,
    NO: false,
  }),
 
  Level: Object.freeze({
    SEVERE: '',
    WARNING: 'WARNING',
    INFO: 'INFO',
    FINE: 'FINE',
    FINER: 'FINER',
    FINEST: 'FINEST',
  }),

} // Log_

var LOG_LEVEL = PRODUCTION_VERSION ? Log_.Level.INFO : Log_.Level.FINEST
var LOG_DISPLAY_FUNCTION_NAMES = PRODUCTION_VERSION ? Log_.DisplayFunctionNames.NO : Log_.DisplayFunctionNames.YES 

// Constants
// ---------

var OAUTH_SERVICE_NAME = SCRIPT_NAME
var TRELLO_BASE_API = "https://api.trello.com"

// TODO - Get all the strings into constants/Enums
// TODO - Get the URI programmatically

var AUTHORIZATION_URI = 'https://script.google.com/macros/s/AKfycby36IYKZvmGJpQwDqfZzD2XRBFIPT2sYyfVsqNaH0Spm4LusDc/exec'
// var AUTHORIZATION_URI = 'https://script.google.com/macros/s/AKfycbwmQ2GrmBTakJMo2aNa6XHii6DvhPMTcQXxOgwoKoE/dev'

var PROPERTY_API_VERSION = SCRIPT_NAME + '_API_Version'

// These are stored localy in the Project Properties to keep them secret
var PROPERTY_API_KEY = SCRIPT_NAME + '_API_KEY'
var PROPERTY_SECRET = SCRIPT_NAME + '_SECRET'
var PROPERTY_PROJECT_KEY = SCRIPT_NAME + '_PROJECT_KEY'

// Function template
// -----------------

/**
 * 
 */
/*
function functionTemplate() {

  

} // functionTemplate()

*/