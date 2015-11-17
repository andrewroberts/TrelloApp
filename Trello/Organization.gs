/**
 * @classdesc
 * This class defines an Trello Organization.
 * @constructor
*/

function Organizations() {

 /**
  * @return {string} The id of this Segment
  */
  Organizations.prototype.getDisplayName = function() {
    return this.wrapped.displayName;
  }
  
  Organizations.prototype.getId = function() {
    return this.wrapped.id;
  }

  Organizations.prototype.GetbillableMemberCount =function() {
    return this.wrapped.billableMemberCount;
  }
  
} // Organizations
