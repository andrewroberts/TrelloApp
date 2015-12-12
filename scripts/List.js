/**
 * @classdesc
 * This class defines a Trello List.
 * @constructor
 */

function List_() {

 /**
  * @return {string} The id of this List
  */
  List_.prototype.getName = function() {
    return this.wrapped.name;
  }
  
  List_.prototype.getId = function() {
    return this.wrapped.id;
  }
  
} // List_
