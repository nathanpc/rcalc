// main.js
// The mains.

// Selected bands.
var sel_bands = {
	values: [ "black", "black", "black" ],
	tolerance: "gold"
};

/**
 * Just a simple onLoad event handler.
 */
function onload() {
	var list = [ resistance.values.red.color, resistance.values.green.color, resistance.values.blue.color, resistance.values.gold.color ];

	var resistor_canvas = new ResistorCanvas(document.getElementById("resistor"));
	resistor_canvas.draw_resistor(list);

	var resistor2_canvas = new ResistorCanvas(document.getElementById("header-resistor"));
	resistor2_canvas.draw_resistor(list);
}

/**
 * Handles the onchange event for the bands selectors.
 *
 * @param {Number} band Band index.
 * @param {Element} elem Which element fired the event.
 */
function bands_onchange(band, elem) {
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
 * Helper class to create a resistor using a <canvas>
 *
 * @constructor
 * @param {Element} canvas A canvas element.
 */
function ResistorCanvas(canvas) {
	this.band_width = 0;
	this.curr_stripe = 0;

	this.canvas = canvas;
	this.context = canvas.getContext("2d");
}

/**
 * Draw a single resistor band to the canvas.
 *
 * @param {String} color The band color.
 */
ResistorCanvas.prototype.draw_band = function (color) {
	this.context.fillStyle = color;
	this.context.fillRect(this.band_width * this.curr_stripe++, 0, this.band_width, this.canvas.height);
}

/**
 * Draws the resistor in the canvas.
 *
 * @param {Array} list Bands array.
 */
ResistorCanvas.prototype.draw_resistor = function (list) {
	var resistor_color = "rgb(188, 137, 93)";

	this.band_width = this.canvas.width / ((list.length * 2) + 2);
	this.curr_stripe = 0;

	// Draw the middle stripes.
	for (var i = 0; i < list.length - 1; i++) {
		this.draw_band(resistor_color);
		this.draw_band(list[i]);
	}

	// Draw tolerance band.
	this.draw_band(resistor_color);
	this.draw_band(resistor_color);
	this.draw_band(list[list.length - 1]);
	this.draw_band(resistor_color);
}
