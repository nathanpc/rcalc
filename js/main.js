// main.js
// The mains power.

var canvas, context = null;
var sel_bands = {
	values: [ "black", "black", "black" ],
	tolerance: "gold"
};

var onload = function () {
	canvas = document.getElementById("resistor");
	context = canvas.getContext("2d");

	// TODO: Draw shit.
	var band_width = canvas.width / 10;  // bands * 2 + 2

	context.fillStyle = "yellow";
	context.fillRect(band_width * 0, 0, band_width, canvas.height);
	context.fillStyle = "red";
	context.fillRect(band_width * 1, 0, band_width, canvas.height);
	context.fillStyle = "yellow";
	context.fillRect(band_width * 2, 0, band_width, canvas.height);
	context.fillStyle = "green";
	context.fillRect(band_width * 3, 0, band_width, canvas.height);
	context.fillStyle = "yellow";
	context.fillRect(band_width * 4, 0, band_width, canvas.height);
	context.fillStyle = "blue";
	context.fillRect(band_width * 5, 0, band_width, canvas.height);
	context.fillStyle = "yellow";
	context.fillRect(band_width * 6, 0, band_width, canvas.height);
	context.fillStyle = "yellow";
	context.fillRect(band_width * 7, 0, band_width, canvas.height);
	context.fillStyle = "gold";
	context.fillRect(band_width * 8, 0, band_width, canvas.height);
	context.fillStyle = "yellow";
	context.fillRect(band_width * 9, 0, band_width, canvas.height);
}

var draw_bands = function (list) {

}

var bands_onchange = function (band, elem) {
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
