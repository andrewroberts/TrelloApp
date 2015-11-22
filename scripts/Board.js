/**
 * @classdesc
 * This class defines an Trello Organization.
 * @constructor
 */

function Board() {

 /**
  * @returns {string} The id of this Segment
  */
  Board.prototype.getName = function() {
    return this.wrapped.name;
  }
  
  Board.prototype.getId = function() {
    return this.wrapped.id;
  }
  
} // Board
