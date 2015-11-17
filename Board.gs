/**
 * @classdesc
 * This class defines an Trello Board.
 * @constructor
 */

function Board() {

	/**
	 * @returns {string} The id of this Segment
	 */
	Board.prototype.getId = function () {
		return this.wrapped.id;
	}

	/**
	 * @returns {string} The name of this board
	 */
	Board.prototype.getName = function () {
		return this.wrapped.name;
	}

	/**
	 * @returns {string} The brief description of this board
	 */
	Board.prototype.getDescription = function () {
		return this.wrapped.desc;
	}

	/**
	 * @returns {string} The description data for this board
	 */
	Board.prototype.getDescriptionData = function () {
		return this.wrapped.descData;
	}

	/**
	 * @returns {boolean} Is this board closed or not?
	 */
	Board.prototype.isClosed = function () {
		return this.wrapped.closed;
	}

	/**
	 * @returns {string} The ID of the organization this board is in
	 */
	Board.prototype.getOrganizationID = function () {
		return this.wrapped.idOrganization;
	}

	/**
	 * @returns {boolean} Has this board been 'starred'?
	 */
	Board.prototype.isFavorited = function () {
		return this.wrapped.pinned;
	}

	/**
	 * @returns {string} The url of this board
	 */
	Board.prototype.getURL = function () {
		return this.wrapped.url;
	}

	/**
	 * @returns {string} The short url of this board
	 */
	Board.prototype.getShortURL = function () {
		return this.wrapped.shortUrl;
	}

	/**
	 * @returns {array} The preferences for this board
	 */
	Board.prototype.getPrefs = function () {
		return this.wrapped.prefs;
	}

	/**
	 * @returns {array} The labels for this board
	 */
	Board.prototype.getLabels = function () {
		return this.wrapped.labelNames;
	}


} // Board