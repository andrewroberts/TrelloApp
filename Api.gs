// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint - TODO
/* jshint asi: true */

// Api.gs
// ======
//
//  This local object provides internal access to the Trello API.
// 

var Api_ = {

  /**
   * The API object manages the API version value
   */

  setVersion: function (version) {
  
    // version checked in setProperty_()
  
    setProperty_(
      PROPERTY_API_VERSION, 
      version, 
      'No valid version passed to App.init()')

  }, // Api_.setVersion()

  /**
   * https://developers.trello.com/advanced-reference
   *
   * @param {object} config Parameters for the API call 
   *   (string} httpMethod (Optional)
   *   (string} service (Required)
   *   (string} id (Optional)
   *   {string} elements (Optional)
   *   {string} filter (Optional)
   *   {object} payload (Optional) A POST call's payload
   */

  fetch: function(config) {

    var errorString = 'The API version is not available, call App.init() first'
    var version = getProperty_(PROPERTY_API_VERSION, OnNull.ERROR, errorString)

    if (!config.hasOwnProperty('service')) {
      throw new TypeError('service has to be defined in config')
    }

    var serviceFullPath = TRELLO_BASE_API + 
      '/' + version +
      '/' + config.service + 
      optionalAddToUrl('id') + 
      optionalAddToUrl('elements') + 
      optionalAddToUrl('filter') 

    var apiKey = getProperty_(PROPERTY_API_KEY, OnNull.ERROR, 'No API key')
    var token = Authorizer_.getToken()
      
    serviceFullPath += '?key=' + apiKey + '&token=' + token + '&name=' + SCRIPT_NAME

    var options = {
      oAuthServiceName: OAUTH_SERVICE_NAME,
      oAuthUseToken: 'always',
    }

    if (config.hasOwnProperty('httpMethod')) {
      options.method = config.httpMethod
    }
    
    if (config.hasOwnProperty('payload')) {
      options.payload = config.payload
    }
    
    var reponse = UrlFetchApp.fetch(serviceFullPath, options)
    return reponse.getContentText()
    
    // Private Functions
    // -----------------
    
    /**
     * Optionally add another options to the fetch URL
     */
    
    function optionalAddToUrl(option) {   
    
      return config.hasOwnProperty(option) ? '/' + config[option] : ''
      
    } // Api_.fetch.optionalAddToUrl()
    
  }, // Api_.fetch()
  
} // Api
