/**
 * @classdesc
 * This class defines an Trello Organization.
 * @constructor
 */

function Board_() {

 /**
  * @returns {string} The id of this Segment
  */
  Board_.prototype.getName = function() {
    return this.wrapped.name;
  }
  
  Board_.prototype.getId = function() {
    return this.wrapped.id;
  }
  
} // Board_
