// resistance.js
// That thing.

var resistance = {};

resistance.values = {
	black: {
		band: 0,
		multiplier: 1,
		tolerance: null
	},
	brown: {
		band: 1,
		multiplier: 10,
		tolerance: 1
	},
	red: {
		band: 2,
		multiplier: 100,
		tolerance: 2
	},
	orange: {
		band: 3,
		multiplier: 1000,
		tolerance: null
	},
	yellow: {
		band: 4,
		multiplier: 10000,
		tolerance: null
	},
	green: {
		band: 5,
		multiplier: 100000,
		tolerance: 0.5
	},
	blue: {
		band: 6,
		multiplier: 1000000,
		tolerance: 0.25
	},
	violet: {
		band: 7,
		multiplier: 10000000,
		tolerance: 0.1
	},
	gray: {
		band: 8,
		multiplier: null,
		tolerance: 0.05
	},
	white: {
		band: 9,
		multiplier: null,
		tolerance: null
	},
	gold: {
		band: null,
		multiplier: 0.1,
		tolerance: 5
	},
	silver: {
		band: null,
		multiplier: 0.01,
		tolerance: 10
	}
};

/**
 * Calculate the resistance based on a array of strings with the band colors.
 *
 * @param {Array} bands Band name colors.
 * @return {Number} Resistance
 */
resistance.calc = function (bands) {
	var res = "";

	for (var i = 0; i < bands.length; i++) {
		var band = bands[i];

		// Check if it's the last band (multiplier).
		if (bands[i + 1] === undefined) {
			// Convert to Number and apply the multiplier.
			res = parseInt(res, 10);
			res *= resistance.values[band].multiplier;
		} else {
			// Append the value to the string.
			res += String(resistance.values[band].band);
		}
	}

	return res;
}

/**
 * Pretty-print a resistance value.
 *
 * @param {String} value Resistance value.
 * @param {Boolean} use_symbol Use ohms symbol?
 * @return {String} Pretty-printed value.
 */
resistance.pretty_print = function (value, tolerance, use_symbol) {
	var result = "";

	// Value.
	if (value >= 1000000) {
		result = (value / 1000000) + "M";
	} else if (value >= 1000) {
		result = (value / 1000) + "k";
	} else {
		result += value;
	}

	// Ohms symbol.
	if (use_symbol || use_symbol === undefined) {
		result += "\u2126";
	} else {
		result += " ohms";
	}

	// Tolenrance.
	if (tolerance !== undefined) {
		result +=  "\u00B1" + resistance.values[tolerance].tolerance + "%";
	}

	return result;
}
