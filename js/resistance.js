// resistance.js
// That thing.

var resistance = {};

/**
 * Calculate the resistance based on a array of strings with the band colors.
 *
 * @param {Array} bands Band name colors.
 * @return {Number} Resistance
 */
resistance.calc = function (bands) {
	var resistance = 0;

	// TODO: Calculate?

	return resistance;
}

/**
 * Pretty-print a resistance value.
 *
 * @param {String} value Resistance value.
 * @param {Boolean} use_symbol Use ohms symbol?
 * @return {String} Pretty-printed value.
 */
resistance.pretty_print = function (value, use_symbol) {
	var result = "";

	if (value >= 1000000) {
		result = (value / 1000000) + "M";
	} else if (value >= 1000) {
		result = (value / 1000) + "k";
	} else {
		result += value;
	}

	if (use_symbol || use_symbol === undefined) {
		result += "\u2126";
	} else {
		result += " ohms";
	}

	return result;
}
