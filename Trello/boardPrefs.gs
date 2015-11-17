/**
 * @classdesc
 * This class defines the Preferences that can be set on a Board.
 * @constructor
 */

function boardPrefs() {

	/**
	 * @return {string} The premission level of this board
	 */
	boardPrefs.prototype.getPermissionLevel = function () {
		return this.wrapped.permissionLevel;
	}

	/**
	 * @return {string} The voting level of this board
	 */
	boardPrefs.prototype.getVotingLevel = function () {
		return this.wrapped.voting;
	}

	/**
	 * @return {string} The comments level of this board
	 */
	boardPrefs.prototype.getCommentsLevel = function () {
		return this.wrapped.comments;
	}

	/**
	 * @return {string} The invitations level of this board
	 */
	boardPrefs.prototype.getInvitationLevel = function () {
		return this.wrapped.invitations;
	}

	/**
	 * @return {boolean} Can this board be joined without an invitation?
	 */
	boardPrefs.prototype.isMembershipOpen = function () {
		return this.wrapped.selfJoin;
	}

} // Board Preferences
