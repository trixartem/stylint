'use strict';

var dollaRe = /\$\w/;
var eqEndRe = /=$|=\s$/;
// var parensRe = /\$\w+/;
// var stripStringRe = /['"].+['"]/;
var ignoreRe = /(\[.+\])|(if)|(for)|(else)|(@media)|(@block)|(calc)|(=|= )$|{$/; // 3


/**
 * @description check that $ is used when declaring vars
 * @param  {string} [line] curr line being linted
 * @return {boolean} true if in order, false if not
 */
var prefixVarsWithDollar = function( line ) {
	if ( this.state.hashOrCSS || ignoreRe.test( line ) ) { return; }

	var hasDolla = true;
	// var mixinArr = [];

	// line = line.replace( stripStringRe, ' ' );

	// if line has a mixin, we need check each param for missing $
	// else we just check if = is present && $ is prefixing something
	if ( this.state.conf === 'always' ) {
		if ( line.indexOf( '=' ) !== -1 &&
			line.indexOf( '@block' ) === -1 &&
			!eqEndRe.test( line ) ) {

			if ( !dollaRe.test( line ) ) {
				hasDolla = false;
			}
		}
		// if ( parensRe.test( line ) && this.state.context === 0 ) {
		// 	mixinArr = line.match( parensRe )[0].split( ',' );
		//
		// 	// returns true if every param has $ or false if even one is missing
		// 	hasDolla = mixinArr.every( function( param ) {
		// 		return dollaRe.test( param );
		// 	} );
		// }
		// else if ( line.indexOf( '=' ) !== -1 && !dollaRe.test( line ) ) {
		// 	hasDolla = false;
		// }
	}
	// the never check is easier, since any $ means it fails
	else if ( this.state.conf === 'never' && !dollaRe.test( line ) ) {
		hasDolla = false;
	}

	if ( this.state.conf === 'always' && !hasDolla ) {
		this.msg( 'variables and parameters must be prefixed with the $ sign' );
	}
	else if ( this.state.conf === 'never' && hasDolla ) {
		this.msg( '$ sign is disallowed for variables and parameters' );
	}

	return hasDolla;
};

module.exports = prefixVarsWithDollar;
