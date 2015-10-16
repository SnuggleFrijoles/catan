/**
 * Created by Isaac on 10/16/15.
 */


var locationNames = ["Hills", "Forest", "Mountains", "Fields", "Pasture", "Dessert"];

//location card class
class Location  {
    //constructor
    constructor(locationName, number) {
    	this.locationName = locationName;
    	this.number = number;
    }
    

    //methods

    get locationName() {
    	return this.locationName
    };
   	get number {
   		return this.number
   	};

    this.getlocationName = function() {return this.locationName};
    this.getnumber = function() {return this.number};



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
var pageWidth = window.innerWidth - 250;
var pageHeight = window.innerHeight;

// Testing canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

ctx.fillStyle = "LightSkyBlue";
ctx.drawRect(0, 0, pageWidth, pageHeight);