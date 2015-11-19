"use strict";

//location card class
class Location {
    //constructor
    constructor(id, locationName, value, x, y) {
        this.id = id;
        this.locationName = locationName;
        this.value = value;
        this.x = x;
        this.y = y;

        // Get the right color and resource name for each location
        switch (locationName) {
            case "Hills":
                this.color = "brown";
                this.resourceName = "brick";
                break;
            case "Forest":
                this.color = "darkgreen";
                this.resourceName = "lumber";
                break;
            case "Mountains":
                this.color = "grey";
                this.resourceName = "ore";
                break;
            case "Fields":
                this.color = "yellow";
                this.resourceName = "grain";
                break;
            case "Pasture":
                this.color = "lightgreen";
                this.resourceName = "wool";
                break;
            case "Dessert":
                this.color = "tan";
                break;
            default:
                this.color = "red";
                break;
        }
    }
}
