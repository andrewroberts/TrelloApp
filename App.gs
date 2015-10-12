// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint (this file) - TODO

// App.gs
// ======
//
// This object provides the external interface to the TrelloApp library

function App(version) {

  Api_.setVersion(setDefault_(version, '1'))
  
  /**
   *
   */

  App.prototype.getMyBoards = function() {
  
    var config = {
      service: 'members',
      id: 'me',
      elements: 'boards',
    }
  
    var responseJSON = Api_.fetch(config);
    var response = JSON.parse(responseJSON);
    
    var obj = {}
    obj.boards = response
    
    this.boards = Wrapper.wrapObjects(this, new Board(), obj.boards);
    return this.boards;
  }

  /**
   *
   */

  App.prototype.getBoardLists = function(boardId) {
  
    var config = {
      service: 'boards',
      id: boardId,
      elements: 'lists',
    }
    
    var responseJSON = Api_.fetch(config) 
    var response = JSON.parse(responseJSON)
    
    var obj = {}
    obj.lists = response
    
    this.lists = Wrapper.wrapObjects(
      this, 
      new List(), 
      obj.lists)
    
    return this.lists;
    
  } // App.getBoardLists()

  /**
   *
   */

  App.prototype.getMyOrganizations = function() {
  
    var config = {
      service: 'members',
      id: 'me',
      elements: 'organizations',
    }
    
    var responseJSON = Api_.fetch(config) 
    var response = JSON.parse(responseJSON)
    
    var obj = {}
    obj.organizations = response
    
    this.organizations = Wrapper.wrapObjects(
      this, 
      new Organizations(), 
      obj.organizations)
    
    return this.organizations;
  }
  
  /**
   * 
   */

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
    var response = JSON.parse(responseJSON)
    
    // TODO - What's this look like??
    return response

  } // createCard()

} // App()
