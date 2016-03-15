# TrelloApp
Google Apps Script library for using the [Trello RESTful API] (https://developers.trello.com/advanced-reference).

At the moment it provides:

* authorization/authentication
* listing of organisations and boards
* getting a list id
* creating new boards
* creating new lists
* creating new cards

The full API to the library is described in [App.gs] (https://github.com/andrewroberts/GAS-TrelloApp/blob/master/App.gs)

You can [use the TrelloApp library] (https://developers.google.com/apps-script/guide_libraries) in you code by using the ID: **MOXamiHNCH44xpQh9H7FTudnfWGfgtIUb**.

# Example Usage

Here's an example of using it to list your boards:

* Create a new GSheet - this gives you an UI to initiate the auth flow.

* Copy this code into the GSheet's script.

* Include the TrelloApp (MOXamiHNCH44xpQh9H7FTudnfWGfgtIUb) and Dialog (MWPmswuaTtvxxYA71VTxu7B8_L47d2MW6) library 

* Run the code to auth TrelloApp with Trello - the first time you run test_createCard() should open a new window with a link you must click to initiate the auth flow.

* Run the code a second time to get the boards JSON - Looking at the Logs you should see the JSON for all your boards.

You can also see an example of the auth flow and an example of TrelloApp's use in code in the [TrelloSync add-ons] (https://github.com/andrewroberts/TrelloSync). 

```

function test_createCard() {

  try {

    var trelloApp = new TrelloApp.App()    
    var boards = trelloApp.getMyBoards()
    Logger.log(boards)
  
  } catch (error) {

    if (error.name === 'AuthorizationError') {
    
      // This is a special error thrown by TrelloApp to indicate
      // that user authorization is required    
      showAuthorisationDialog()
      
    } else {
    
      throw error
    }
  }
  
  return
  
  // Private Functions
  // -----------------
  
  function showAuthorisationDialog() {
      
    var authorizationUrl = trelloApp.getAuthorizationUri()
    
    Dialog.show(
      'Opening authorization window...', 
        'Follow the instructions in this window, close ' + 
        'it and then try the action again. ' + 
        '<br/><br/>Look out for a warning that ' + 
        'your browser has blocked the authorisation pop-up from Trello. ' + 
        '<script>window.open("' + authorizationUrl + '")</script>',
      160)
      
  } // showAuthorisationDialog()
    
} // test_createCard()

function reset() {
  new TrelloApp.App().reset()
}

```

It is based on the code by [jacobdvb](http://stackoverflow.com/users/1408731/jacobvdb) in [this StackOverflow question](http://stackoverflow.com/questions/31626748/trelloapp-with-oauth-as-a-library-does-not-seem-to-work).


