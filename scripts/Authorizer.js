// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint - TODO
/* jshint asi: true */

// Authorizer.gs
// =============
//
// This object provides the autorization methods

/**
 * The web app that allows the user to open the Trello auth window
 */

function doGet(e) {

  // TODO - Hard code this for now, and assume the calling script is using
  // this service
  
  var service = Authorizer_.getTrelloService()  

  // The underlying library doesn't add the app name so tag it on here
  var authorizationUrl = service.authorize() + '&name=' + OAUTH_SERVICE_NAME
  
  var template = HtmlService.createTemplateFromFile('Authorize')
  template.authorizationUrl = authorizationUrl
  var page = template.evaluate();
  return HtmlService.createHtmlOutput(page)
  
} // doGet()

var Authorizer_ = {

  /**
   * 
   */

  getTrelloService: function() {
    
    var service = OAuth1.createService(OAUTH_SERVICE_NAME)
    service.setAccessTokenUrl("https://trello.com/1/OAuthGetAccessToken")
    service.setRequestTokenUrl("https://trello.com/1/OAuthGetRequestToken")
    service.setAuthorizationUrl("https://trello.com/1/OAuthAuthorizeToken?scope=read,write")
    service.setConsumerKey(getApiKey_())
    service.setConsumerSecret(getSecret_())
    service.setProjectKey(getProjectKey_())
    service.setCallbackFunction('authCallback')
    service.setPropertyStore(PropertiesService.getUserProperties())
    return service
    
  }, // Authorizer_.getTrelloService

  /**
   * 
   */
   
  resetTrello:function() {
    
    OAuth1
      .createService(OAUTH_SERVICE_NAME)
      .setPropertyStore(PropertiesService.getUserProperties())
      .reset()
    
    PropertiesService.getUserProperties().deleteAllProperties()
    
  }, // Authorizer_.resetTrello()

  /**
   * 
   */

  getToken: function() {
    
    var service = this.getTrelloService()
    var token = ''
    
    if (service.hasAccess()) {
      
      var accessDataJson = PropertiesService
        .getUserProperties()
        .getProperty('oauth1.' + OAUTH_SERVICE_NAME)
        
      var accessData = JSON.parse(accessDataJson)
      
      if (accessData) {
        
        token = accessData.public
        
      } else {
        
        throw new AuthorizationError("Trello API unauthorized! Please authorize at " + AUTHORIZATION_URI)
      }
      
    } else {
      
      throw new AuthorizationError("Trello API unauthorized! Please authorize at " + AUTHORIZATION_URI)
    }
    
    return token
    
  }, // Authorizer_.getToken()
  
} // Authorizer_

/**
 * 
 */

function authCallback(request) {

  var service = Authorizer_.getTrelloService()
  var isAuthorized = service.handleCallback(request)
  
  if (isAuthorized) {
  
    var template = HtmlService.createTemplateFromFile('Authorized')
    var page = template.evaluate()
    return HtmlService.createHtmlOutput(page)
    
  } else {
  
    return HtmlService.createHtmlOutput('Denied. You can close this page')
  }
  
} // authCallback()

// Custom Authorization Error
// --------------------------

/** 
 * Create a new authorization Error object, that prototypally 
 * inherits from the Error constructor. This can be used to 
 * determine if the user needs to gain authorization from Trello
 */
 
function AuthorizationError(message) {

  this.name = 'AuthorizationError'
  this.message = message || 'Authorization error'
  this.stack = (new Error()).stack
  
  AuthorizationError.prototype = Object.create(Error.prototype)
  AuthorizationError.prototype.constructor = AuthorizationError
  
} // AuthorizationError

