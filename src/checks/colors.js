'use strict';

var hexRe = /#(?:[0-9a-f]{3}){1,2}/im;


/**
 * @description if we disallowed hex colors, check for them and return true if found
 * @param {string} [line] curr line being linted
 * @returns {boolean} true if hex color found, false if not
 */
var colors = function( line ) {
	if ( line.indexOf( '=' ) !== -1 ) { return; }
	var hex = false;

	// so basically if we're using #hex colors outside of a var declaration
	if ( hexRe.test( line ) ) {
		hex = true;
	}

	if ( hex ) {
		this.msg( 'hexidecimal color should be a variable' );
	}

	return hex;
};

module.exports = colors;
