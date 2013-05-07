// main.js
// The mains power.

var canvas, context = null;
var sel_bands = {
	values: [ "black", "black", "black" ],
	tolerance: "gold"
};

/**
 * Just a simple onLoad event handler.s
 */
var onload = function () {
	canvas = document.getElementById("resistor");
	context = canvas.getContext("2d");

	var list = [ "green", "red", "blue", "gold" ];
	canvas_helper.band_width = canvas.width / ((list.length * 2) + 2);
	canvas_helper.draw_resistor(list);
}

/**
 * Handles the onchange event for the bands selectors.
 *
 * @param {Number} band Band index.
 * @param {Element} elem Which element fired the event.
 */
var bands_onchange = function (band, elem) {
	// Check if it's a normal band or the special tolerance one.
	if (band !== "tolerance") {
		// Set band.
		sel_bands.values[band] = elem.options[elem.selectedIndex].value;
	} else {
		// Set tolerance.
		sel_bands.tolerance = elem.options[elem.selectedIndex].value;
	}

	// Calculate and pretty print.
	console.log(resistance.pretty_print(resistance.calc(sel_bands.values), sel_bands.tolerance));
}


/**
 * Just helps with the canvas stuff.
 */
var canvas_helper = {
	band_width: 0,
	curr_stripe: 0
};

/**
 * Draw a single resistor band to the canvas.
 *
 * @param {String} color The band color.
 */
canvas_helper.draw_band = function (color) {
	context.fillStyle = color;
	context.fillRect(canvas_helper.band_width * canvas_helper.curr_stripe++, 0, canvas_helper.band_width, canvas.height);
}

/**
 * Draws the resistor in the canvas.
 *
 * @param {Array} list Bands array.
 */
canvas_helper.draw_resistor = function (list) {
	canvas_helper.curr_stripe = 0;

	// Draw the middle stripes.
	for (var i = 0; i < list.length - 1; i++) {
		canvas_helper.draw_band("yellow");
		canvas_helper.draw_band(list[i]);
	}

	// Draw tolerance band.
	canvas_helper.draw_band("yellow");
	canvas_helper.draw_band("yellow");
	canvas_helper.draw_band(list[list.length - 1]);
	canvas_helper.draw_band("yellow");
}
