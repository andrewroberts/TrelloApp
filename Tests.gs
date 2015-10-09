// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint (this file) - TODO

/**
 * Tests.gs
 * ========
 *
 * Unit test functions
 */

var API_VERSION = '1'

function testOpen(){

  var app = new App(API_VERSION)

  // Look for 'RTM List 1' in the 'Rose Task Manager' and 
  // add a new card to it

  app.getMyBoards().some(function(board) {
    
    if (board.getName() === 'Rose Task Manager') {
      
      Logger.log('Found RTM board')
      
      app.getBoardLists(board.getId()).some(function(list) {

        if (list.getName() === 'RTM Test List 1') {

          Logger.log('Found RTM list 1')

          app.createCard({
            name: 'test card 3', 
            idList: list.getId(),
          }) 
          
          Logger.log('Created new card')
        }
      })   
    }
  })
  
} // testOpen()
