// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint - TODO
/* jshint asi: true */

// Authorizer.gs
// =============
//
// This object provides the autorization methods
var Authorizer_ = {

	/**
	 * @returns {object} Returns an OAuth1 Service for Trello
	 */
	getTrelloService : function () {
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

	}, // Authorizer_.getTrelloService

	/**
	 * Resets all OAuth1 settings in Authorizer object.
	 */
	resetTrello : function () {
		OAuth1.createService('trello')
		.setPropertyStore(PropertiesService.getUserProperties())
		.reset();

	}, // Authorizer_.resetTrello()

	/**
	 * 
	 */
	getToken : function () {

		var service = Authorizer_.getTrelloService()
			var token = ''

			if (service.hasAccess) {

				var accessData = JSON.parse(PropertiesService.getUserProperties().getProperty('oauth1.trello'))

					if (accessData) {

						token = accessData.public

					} else {

						throw new Error("Trello API unauthorized! Please authorize at " + AUTHORIZATION_URI)
					}

			} else {

				throw new Error("Trello API unauthorized! Please authorize at " + AUTHORIZATION_URI)
			}

			return token

	}, // Authorizer_.getToken()

} // Authorizer_

/**
 *
 */

function authCallback(request) {

	var service = Authorizer_.getTrelloService();
	var isAuthorized = service.handleCallback(request);

	if (isAuthorized) {

		var template = HtmlService.createTemplateFromFile('Authorized');
		var page = template.evaluate();
		return HtmlService.createHtmlOutput(page)

	} else {

		return HtmlService.createHtmlOutput('Denied. You can close this page');
	}

} // authCallback()

function resetTrello() {
	Authorizer_.resetTrello();
}

function deleteUserProperties() {
	PropertiesService.getUserProperties().deleteAllProperties()
}

function getUserData() {
	Logger.log(PropertiesService.getUserProperties().getProperty('oauth1.trello'))
}