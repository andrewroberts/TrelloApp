// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint - TODO
/* jshint asi: true */

// Authorizer.gs
// =============
//
// This object provides the autorization methods

var Authorizer = {

  // The web app to trigger the Trello authorization popup
  scriptUri: 'https://script.google.com/macros/s/AKfycby36IYKZvmGJpQwDqfZzD2XRBFIPT2sYyfVsqNaH0Spm4LusDc/exec',
  
  /**
   * 
   */

  getTrelloService: function() {
    
    var service = OAuth1.createService(OAUTH_SERVICE_NAME);
    service.setAccessTokenUrl("https://trello.com/1/OAuthGetAccessToken");
    service.setRequestTokenUrl("https://trello.com/1/OAuthGetRequestToken");
    service.setAuthorizationUrl("https://trello.com/1/OAuthAuthorizeToken?scope=read,write");
    service.setConsumerKey(getProperty_(PROPERTY_API_KEY, OnNull.ERROR));
    service.setConsumerSecret(getProperty_(PROPERTY_SECRET, OnNull.ERROR));
    service.setProjectKey(getProperty_(PROPERTY_PROJECT_KEY, OnNull.ERROR));
    service.setCallbackFunction('authCallback');
    service.setPropertyStore(PropertiesService.getUserProperties());
    return service;
    
  }, // Authorizer.getTrelloService

  /**
   * 
   */
   
  resetTrello:function() {
    
    OAuth1.createService('trello')
    .setPropertyStore(PropertiesService.getUserProperties())
    .reset();
    
  }, // Authorizer.resetTrello()

  /**
   * 
   */

  getToken: function() {
    
    var service = Authorizer.getTrelloService()
    var token = ''
    
    if (service.hasAccess) {
      
      var accessData = JSON.parse(PropertiesService.getUserProperties().getProperty('oauth1.trello' ))
      
      if (accessData){
        
        token = accessData.public
        
        } else {
          
          throw new Error("trello API unauthorized! Please authorize at " + Authorizer.scriptUri)
        }
      
    } else {
      
      throw new Error("trello API unauthorized! Please authorize at " + Authorizer.scriptUri)
    }
    
    return token
    
  }, // Authorizer.getToken()
  
} // Authorizer

/**
 * 
 */

function  authCallback(request) {

  var service = Authorizer.getTrelloService();
  var isAuthorized = service.handleCallback(request);
  
  if (isAuthorized) {
  
    var template = HtmlService.createTemplateFromFile('Authorized');
    var page = template.evaluate();
    return HtmlService.createHtmlOutput(page)
    
  } else {
  
    return HtmlService.createHtmlOutput('Denied. You can close this page');
  }
  
} // authCallback()

function resetTrello(){
   Authorizer.resetTrello();
}

function deleteUserProperties(){
  PropertiesService.getUserProperties().deleteAllProperties()
}

function getUserData() {
  Logger.log(PropertiesService.getUserProperties().getProperty('oauth1.trello' ))
}
