function doGet(e){

  var service = Authorizer_.getTrelloService();
  var authorizationUrl = service.authorize();
  var template = HtmlService.createTemplateFromFile('Authorize');
  template.authorizationUrl = authorizationUrl;
  
  var page = template.evaluate();
  return HtmlService.createHtmlOutput(page)
}
