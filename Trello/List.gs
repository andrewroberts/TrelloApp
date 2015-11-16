/**
 * @classdesc
 * This class defines a Trello List.
 * @constructor
 */

function List() {

 /**
  * @return {string} The id of this List
  */
  List.prototype.getName = function() {
    return this.wrapped.name;
  }
  
  List.prototype.getId = function() {
    return this.wrapped.id;
  }
  
} // List
