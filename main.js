/**
 * Created by Isaac on 10/16/15.
 */


var locationNames = ["Hills", "Forest", "Mountains", "Fields", "Pasture", "Dessert"];

//location card class
function Location(locationName, number)  {
    //constructor
    this.locationName = locationName;
    this.number = number;

    //methods
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
