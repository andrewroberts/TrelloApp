# TrelloApp
Google Apps Script library for using the [Trello RESTful API] (https://developers.trello.com/advanced-reference).

At the moment it provides:

* authorization/authentication
* listing of organisations and boards
* getting a list id
* creation of new cards in an existing board

The full API to the library is described in [App.gs] (https://github.com/andrewroberts/GAS-TrelloApp/blob/master/App.gs)

You can [use the TrelloApp library] (https://developers.google.com/apps-script/guide_libraries) in you code by using the ID: **MOXamiHNCH44xpQh9H7FTudnfWGfgtIUb**.

Here's an example of using it to create a new card:

```

function test_createCard() {

  // Look for 'RTM List 1' in the 'Rose Task Manager' board and 
  // add a new card to it

  var trelloApp = new TrelloApp.App()

  trelloApp.getMyBoards().some(function(board) {
  
    if (board.getName() === 'Rose Task Manager') {
    
      var foundList = trelloApp.getBoardLists(board.getId()).some(function(list) {
      
        if (list.getName() === 'RTM Test List 1') {
        
          trelloApp.createCard({
            name: 'test card 3', 
            idList: list.getId(),
          }) 
          
          return true
        }
      }) 
      
      return foundList
    }
  })
  
} // test_createCard()

```

It is based on the code by [jacobdvb](http://stackoverflow.com/users/1408731/jacobvdb) in [this StackOverflow question](http://stackoverflow.com/questions/31626748/trelloapp-with-oauth-as-a-library-does-not-seem-to-work).


