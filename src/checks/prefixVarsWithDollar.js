'use strict';

var dollaRe = /\$\w/;
var parensRe = /\(.+\)/;
var ignoreRe = /(if)|(for)|(else)|(@media)|(@block)|(calc)|(=|= )$/; // 3

// check that $ is used when declaring vars
module.exports = function prefixVarsWithDollar(line) {
	if ( this.state.hashOrCSS || ignoreRe.test(line) ) { return; }

	var hasDolla = true;
	var mixinArr = [];

	// if line has a mixin, we need check each param for missing $
	// else we just check if = is present && $ is prefixing something
	if ( this.state.conf === 'always' ) {
		if ( parensRe.test(line) && this.state.context === '0' ) {
			mixinArr = line.match(parensRe)[0].split(',');

			// returns true if every param has $ or false if even one is missing
			hasDolla = mixinArr.every(function(param) {
				return dollaRe.test(param);
			});
		}
		else if ( line.indexOf('=') !== -1 && !dollaRe.test(line) ) {
			hasDolla = false;
		}
	}
	// the never check is easier, since any $ means it fails
	else if ( this.state.conf === 'never' && !dollaRe.test(line) ) {
		hasDolla = false;
	}

	if ( this.state.conf === 'always' && !hasDolla ) {
		this.msg('variables and parameters must be prefixed with the $ sign');
	}
	else if ( this.state.conf === 'never' && hasDolla ) {
		this.msg('$ sign is disallowed for variables and parameters');
	}

	return hasDolla;
};