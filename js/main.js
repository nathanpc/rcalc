// main.js
// The mains.


var resistor_canvas = null;
var header_canvas = null;

// Selected bands.
var sel_bands = {
	values: [ "black", "black", "black" ],
	tolerance: "gold"
};

// Prepare the onLoad event.
window.addEventListener("load", onload, false);

/**
 * Just a simple onLoad event handler.
 */
function onload() {
	// Set the selectors events.
	document.getElementById("band1").addEventListener("change", function () {
		bands_onchange(0, this);
	}, false);

	document.getElementById("band2").addEventListener("change", function () {
		bands_onchange(1, this);
	}, false);

	document.getElementById("multiplier").addEventListener("change", function () {
		bands_onchange(2, this);
	}, false);

	document.getElementById("tolerance").addEventListener("change", function () {
		bands_onchange("tolerance", this);
	}, false);

	// Check for Cache updates.
	window.applicationCache.addEventListener("updateready", function (e) {
		console.log("Update available");

		if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
			window.applicationCache.swapCache();
			console.log("Updated");

			if (confirm("A new version of this WebApp is available. Load it?")) {
				location.reload();
			}
		}
	}, false);

	// Setup some canvas stuff.
	//resistor_canvas = new ResistorCanvas(document.getElementById("resistor"));
	header_canvas = new ResistorCanvas(document.getElementById("header-resistor"));

	// Draw stuff in the canvas for the first time and update the result.
	update_result();
	update_canvas();

	// Firefox OS (nuclear) stuff.
	if (navigator.mozApps) {
		var request = navigator.mozApps.getSelf();
		request.onsuccess = function() {
			if (!request.result) {
				// Not installed
				if (confirm("Looks like you're using a Firefox OS phone. Would you like to install this as an app?")) {
					var app = navigator.mozApps.install("/manifest.webapp");

					app.onsuccess = function (data) {
						console.log("Installed on Firefox OS");
						// TODO: Fire a Analytics event.
					}

					app.onerror = function () {
						alert("Something bad happened while trying to install the app:" + this.error.name);
					}
				} else {
					// The user doesn't want me... :'(
					alert("That's ok. If you change your mind in the future you can search for 'rCalc' in the Firefox Marketplace");
					// TODO: Use localStorage to prevent this from appearing again.
				}
			}
		}

		request.onerror = function() {
			alert("Error checking installation status: " + this.error.message);
		}
	}
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
	update_result();

	// Update the canvas and the result label.
	update_canvas();
}

/**
 *	Updates the result label according to the bands selected.
 */
function update_result() {
	var result = resistance.pretty_print(resistance.calc(sel_bands.values), sel_bands.tolerance);

	document.getElementById("result").innerHTML = result;
}

/**
 *	Updates the canvas according to the bands selected.
 */
function update_canvas() {
	var list = sel_bands.values.concat(sel_bands.tolerance);
	for (var i = 0; i < list.length; i++) {
		list[i] = ResistorCanvas.get_color(list[i]);
	}

	//resistor_canvas.draw_resistor(list);
	header_canvas.draw_resistor(list);
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

	// Setup for hi-res displays.
	if (window.devicePixelRatio > 1) {
		this.canvas.width = this.canvas.width * window.devicePixelRatio;
		this.canvas.height = this.canvas.height * window.devicePixelRatio;

		this.canvas.style.width = this.canvas.width / window.devicePixelRatio + "px";
		this.canvas.style.height = this.canvas.height / window.devicePixelRatio + "px";
	}
}

/**
 *	Get the correct color code from the resistance.values JSON.
 *
 *	@param {String} name Color name.
 *	@return {String} Correct color code.
 */
ResistorCanvas.get_color = function (name) {
	return resistance.values[name].color;
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
