/**
 * Created by Isaac on 10/16/15.
 */

"use strict";

var locationNames = ["Hills", "Forest", "Mountains", "Fields", "Pasture", "Dessert"];
// adding a comment here
//location card class
class Location  {
	//constructor
	constructor(locationName, number) {
		this.locationName = locationName;
		this.number = number;
	}
	

	//methods
/*
	get locationName() {
		return this.locationName;
	}
	get number() {
		return this.number;
	}

	set locationName(locationName) {
		this.locationName = locationName;
	}
	set number(locationName) {
		this.number = locationName;
	}
*/
}
//var isaac = new Location("Isaac", 20);
//var emily = new Location("Emily", 20)
var locations = [];
//locations.push(new Location("Isaac",20));
for (var i = 0; i < locationNames.length; i++) {
	locations.push(new Location(locationNames[i], 2));
}

//locations.push(new Location("Isaac",20));

console.log(locations);

// Get the page bounds
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    pageWidth = w.innerWidth || e.clientWidth || g.clientWidth,
    pageHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;


// Testing canvas
var canvas = document.getElementById('canvas');
canvas.width = pageWidth;
canvas.height = pageHeight;
var ctx = canvas.getContext("2d");

ctx.fillStyle = "LightSkyBlue";
ctx.fillRect(0, 0, pageWidth, pageHeight);
