// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint (this file) - TODO

// App.gs
// ======
//
// This object provides the external interface to the TrelloApp library
//
// Any of the methods can throw a special error called "AuthorizationError"
// which indicates that there may be a problem with authorisation and the 
// calling script should prompt the user to re-authorise the API.
//
// The library user can also throw this error if it suspects authorisation is
// needed

// TODO - Use the Log library throughout the code

/**
 * This is the entry point into this library:
 *
 *   var trelloApp = new TrelloApp.App({
 *     version: '1',
 *     log: Log,
 *   })
 *
 * @param {object} { 
 *   version: {string} version [OPTIONAL] The version of the Trello API being used, defaults to 1.0
 *   log: {object} logging library [OPTIONAL] a logging object that provides an API similar to Log (MqTFuiXcPtS5rVUZ_jC9Z4tnfWGfgtIUb) - see EmptyLogLibrary
 * }
 */

function App(config) {

  // Extract the config parameters

  var version = config.hasOwnProperty('version') ? config.version : '1'
  Api_.setVersion(version)

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()

  if (config.hasOwnProperty('log') && spreadsheet !== null) {

    // This library is running in the context of a spreadsheet so use
    // it for trace logging

    Log_ = config.log
    
    Log_.init({
      level: LOG_LEVEL, 
      sheetId: spreadsheet.getId(),
      displayFunctionNames: LOG_DISPLAY_FUNCTION_NAMES})
  }
  
  /**
   * If an error is thrown the first thing to try is displaying this
   * URI to the user to trigger Trello authorization pop-up, then get
   * them to try again.
   */
  
  // TODO - Probably a nicer way of doing that
  
  App.prototype.getAuthorizationUri = function() {
  
    return AUTHORIZATION_URI
  
  } // App.prototype.getAuthorizationUrl()
  
  /**
   * 
   */
  
  App.prototype.reset = function() {
  
    Authorizer_.resetTrello()
  
  } // App.prototype.reset()
  
  /**
   * Get the users boards
   *
   * @param {object} params 
   *   filter: {string} one of the Trello API filter values
   *
   * @return {object} wrapped board object or null
   */

  App.prototype.getMyBoards = function(params) {
      
    var config = {
      service: 'members',
      id: 'me',
      elements: 'boards',
    }

    if (typeof params !== 'undefined' && params.hasOwnProperty('filter')) {
      config.filter = params.filter
    }
    
    var responseJSON = Api_.fetch(config)
    
    if (responseJSON === null) {
      return null
    }
    
    var response = JSON.parse(responseJSON)
    
    var obj = {}
    obj.boards = response
    
    this.boards = Wrapper_.wrapObjects(this, new Board_(), obj.boards)
    return this.boards
    
  } // App.prototype.getMyBoards()

  /**
   * Get all of the lists for a particular board
   *
   * @return {object} wrapped list object or null
   */

  App.prototype.getBoardLists = function(boardId) {
  
    var config = {
      service: 'boards',
      id: boardId,
      elements: 'lists',
    }
    
    var responseJSON = Api_.fetch(config)
    
    if (responseJSON === null) {
      return null
    }    
    
    var response = JSON.parse(responseJSON)
    
    var obj = {}
    obj.lists = response
    
    this.lists = Wrapper_.wrapObjects(this, new List_(), obj.lists)
    
    return this.lists
    
  } // App.getBoardLists()

  /**
   * Get all of the users organisations
   *
   * @return {object} wrapped organisation object or null
   */

  App.prototype.getMyOrganizations = function() {
  
    var config = {
      service: 'members',
      id: 'me',
      elements: 'organizations',
    }
    
    var responseJSON = Api_.fetch(config) 
    
    if (responseJSON === null) {
      return null
    }
      
    var response = JSON.parse(responseJSON)
    
    var obj = {}
    obj.organizations = response
    
    this.organizations = Wrapper_.wrapObjects(
      this, 
      new Organizations_(), 
      obj.organizations)
    
    return this.organizations
    
  } // App.prototype.getMyOrganizations()
  
  /*
   * @param {object} config This becomes the payload for the cards API call, 
   *                        so matches the 
   *
   * From docs: https://developers.trello.com/advanced-reference/card#post-1-cards, 
   * although the 'requirements' have changed 
   * 
   *   name (required) Valid Values: The name of the new card. It isn't required if the name is being copied from provided by a URL, file or card that is being copied.
   *   desc (optional) Valid Values: a string with a length from 0 to 16384
   *   pos (optional) Default: bottom Valid Values: A position. top, bottom, or a positive number.
   *   due (optional) Default: null Valid Values: A date
   *   idList (required) Valid Values: id of the list that the card should be added to
   *   idMembers (optional) Valid Values: A comma-separated list of objectIds, 24-character hex strings
   *   idLabels (optional) Valid Values: A comma-separated list of objectIds, 24-character hex strings
   *   urlSource (optional) Default: null Valid Values: A URL starting with http:// or https:// or null
   *   fileSource (optional) Valid Values: A file
   *   idCardSource (optional) Valid Values: The id of the card to copy into a new card.
   *   keepFromSource (optional) Default: all Valid Values: Properties of the card to copy over from the source.
   *
   * @return {object} response text or null
   */

  App.prototype.createCard = function(config) {

    assertStringNotEmpty_(config.name, 'App.createCard() needs a name for the card')
    assertStringNotEmpty_(config.idList, 'App.createCard() needs an id list for the card')

    setDefault_(config.due, null)
    setDefault_(config.urlSource, 'App.createCard() needs a url source for the card')

    var options = {
      httpMethod: 'POST',
      service: 'cards',
      payload: config,
    }

    var responseJSON = Api_.fetch(options) 
    
    if (responseJSON === null) {
      return null
    }

    var response = JSON.parse(responseJSON)
    
    // TODO - What's this look like??
    return response

  } // createCard()

} // App()
