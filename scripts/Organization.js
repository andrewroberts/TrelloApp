/**
 * @classdesc
 * This class defines an Trello Organization.
 * @constructor
*/

function Organizations_() {

 /**
  * @return {string} The id of this Segment
  */
  
  Organizations_.prototype.getDisplayName = function() {
    return this.wrapped.displayName;
  }
  
  Organizations_.prototype.getId = function() {
    return this.wrapped.id;
  }

  Organizations_.prototype.GetbillableMemberCount = function() {
    return this.wrapped.billableMemberCount;
  }
  
} // Organizations_
