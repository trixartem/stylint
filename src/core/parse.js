'use strict';

// strips out comments and urls
var cleanFileRe = /( +|:)url\(.+\)|(^(\/\*)|([ \t'"](\/\*)))(?!\/)(.|[\r\n]|\n)+?\*\/\n?/gm;


/**
 * @description parses file for testing by removing extra new lines and block comments
 * @param {Object} [err] error obj from async if it exists
 * @param {Array} [res] array of files to parse
 * @returns {Function} test function
 */
var parse = function( err, res ) {
	if ( err ) { throw new Error(err); }

	return res.forEach( function( file, i ) {
		var lines;
		this.cache.file = this.cache.files[i];
		this.cache.fileNo = i;

		// strip out block comments, but dont destroy line history
		// to do these we replace block comments with new lines
		lines = file.toString().replace( cleanFileRe, function( str ) {
			return ( new Array( str.split( /\r\n|\r|\n/ ).length ) ).join( '\n' );
		} ).split( '\n' );

		// updating cache as we go, and passing to the next step
		lines.forEach( function( line, lineNo ) {
			lineNo++; // line nos don't start at 0
			this.cache.line = this.trimLine( line );
			this.cache.lineNo = lineNo++;
			return this.setState();
		}.bind( this ) );

		// save previous file
		this.cache.prevFile = this.cache.file;

		// if on the last file, call the done function to output success or error msg
		if ( this.cache.fileNo === res.length - 1 ) {
			return this.reporter( '', 'done' );
		}
	}.bind( this ) );
};

module.exports = parse;
