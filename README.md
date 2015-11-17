# GAS-TrelloApp
Google Apps Script library for using the [Trello RESTful API] (https://developers.trello.com/advanced-reference).

It currently has on-going development in these areas:

* authorization/authentication
* object-oriented approach to Trello 'objects'
<<<<<<< HEAD

It currently can be used to:
* Authorize and Authenticate Users
* Get all Boards and Orgnizations for Users
* Get a List ID
* Create a new Card in an Existing Board

=======

It currently can be used to:
* authorize / authenticate users
* getting a list id
* creation of new cards in an existing board

>>>>>>> be3806edf0a63fd0216c05cfd2e04366d0c7a8f5
You can use the TrelloApp library in your code by using the ID: **MOXamiHNCH44xpQh9H7FTudnfWGfgtIUb**.

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


