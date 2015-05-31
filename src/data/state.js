/**
 * @description i hold the state
 * @return {Object} [i expose properties to the entire app]
 */
module.exports = {
	conf: false, // config for currently running check ('always' || 'never' || etc)
	context: 0, // what is our level of nesting?
	exitCode: 1, // err or no err
	hasComment: false, // checks for // in a line
	hashOrCSS: false, // are we in a hash
	keyframes: false, // are we in @keyframes
	killSwitch: false, // are we over our warning limit
	openBracket: false, // is there an unclosed bracket
	path: '', // curr dir || file
	prevContext: 0, // save the last context as well
	severity: 'warning', // severity level for current check
	strictMode: false, // run all tests regardless?
	testsEnabled: true, // are we running linter tests
	quiet: false, // turn off console logs
	watching: false // are we watching
};