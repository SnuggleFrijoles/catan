"use strict";

var tileWidth = 124, tileHeight = 108;

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

// Class for whole board of tiles
class Board {
    // Constructor
    constructor() {
        // Setup array for all tiles
        this.tiles = [];

        // Make a list with the right number of each tile
        var locationNames = ["Hills", "Forest", "Mountains", "Fields", "Pasture", "Dessert"];
        var locations = [];

        for (var i = 0; i < 3; i++)
            locations.push("Hills");
        for (var i = 0; i < 4; i++)
            locations.push("Forest");
        for (var i = 0; i < 3; i++)
            locations.push("Mountains");
        for (var i = 0; i < 4; i++)
            locations.push("Fields");
        for (var i = 0; i < 4; i++)
            locations.push("Pasture");
        locations.push("Dessert");

        // Make a list with the right number of each tile value
        var values = [];

        values.push(2);
        for (var i = 3; i < 12; i++) {
            if (i != 7) {
                for (var j = 0; j < 2; j++)
                    values.push(i);
            }
        }
        values.push(12);

        // Randomly shuffle the location array and the values array
        locations = shuffle(locations);
        values = shuffle(values);
        
        // Get the position of the robber
        this.robberPosition = locations.indexOf("Dessert");

        // Store tiles with correct positions and values
        var x = 200,
            y = 50,
            valIndex = 0;

        for (var i = 0; i < 3; i++) {
            if (locations[i] != "Dessert")
                this.tiles.push(new Location(i, locations[i], values[valIndex++], x, y));
            else
                this.tiles.push(new Location(i, locations[i], 0, x, y));
            x += tileWidth;
        }
        x -= 3.5 * tileWidth;
        y += tileHeight;
        for (var i = 3; i < 7; i++) {
            if (locations[i] != "Dessert")
                this.tiles.push(new Location(i, locations[i], values[valIndex++], x, y));
            else
                this.tiles.push(new Location(i, locations[i], 0, x, y));
            x += tileWidth;
        }
        x -= 4.5 * tileWidth;
        y += tileHeight;
        for (var i = 7; i < 12; i++) {
            if (locations[i] != "Dessert")
                this.tiles.push(new Location(i, locations[i], values[valIndex++], x, y));
            else
                this.tiles.push(new Location(i, locations[i], 0, x, y));
            x += tileWidth;
        }
        x -= 4.5 * tileWidth;
        y += tileHeight;
        for (var i = 12; i < 16; i++) {
            if (locations[i] != "Dessert")
                this.tiles.push(new Location(i, locations[i], values[valIndex++], x, y));
            else
                this.tiles.push(new Location(i, locations[i], 0, x, y));
            x += tileWidth;
        }
        x -= 3.5 * tileWidth;
        y += tileHeight;
        for (var i = 16; i < 19; i++) {
            if (locations[i] != "Dessert")
                this.tiles.push(new Location(i, locations[i], values[valIndex++], x, y));
            else
                this.tiles.push(new Location(i, locations[i], 0, x, y));
            x += tileWidth;
        }
    }

    // Function to draw a single tile
    drawTile(location) {
        this.drawHexagon(ctx, location.x, location.y, location.color);

        if (location.value != 0) {
            if (location.value == 6 || location.value == 8)
                ctx.fillStyle = "red";
            else
                ctx.fillStyle = "black";
            ctx.strokeStyle = "black";
            ctx.font = "50px Arial";

            if (location.value < 10) {
                ctx.fillText(location.value, location.x + 47, location.y + 90);
                ctx.strokeText(location.value, location.x + 47, location.y + 90);
            }
            else {
                ctx.fillText(location.value, location.x + 33, location.y + 90);
                ctx.strokeText(location.value, location.x + 33, location.y + 90);
            }
        }
    }

    // Function to draw a hexagon
    drawHexagon(canvasContext, x, y, fillColor) {
        var sideLength = 72;
        var hexagonAngle = 0.523598776; // 30 degrees in radians
        var hexHeight = Math.sin(hexagonAngle) * sideLength;
        var hexRadius = Math.cos(hexagonAngle) * sideLength;
        var hexRectangleHeight = sideLength + 2 * hexHeight;
        var hexRectangleWidth = 2 * hexRadius;

        canvasContext.fillStyle = fillColor;
        canvasContext.beginPath();
        canvasContext.moveTo(x + hexRadius, y);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo(x, y + sideLength + hexHeight);
        canvasContext.lineTo(x, y + hexHeight);
        canvasContext.closePath();

        canvasContext.fill();
        canvasContext.fillStyle = "black";
        canvasContext.stroke();
    }
    
    // Function to draw a circle
    drawCircle(context, centerX, centerY, radius) {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "lightgrey";
        context.fill();
        context.strokeStyle = "black";
        context.stroke();
    }

    // Render function
    render(ctx) {
        // Fill the background
        ctx.fillStyle = "LightSkyBlue";
        ctx.fillRect(0, 0, pageWidth, pageHeight);
        
        // Draw each tile
        for (var i = 0; i < this.tiles.length; i++) {
            this.drawTile(this.tiles[i]);
        }
        
        // Draw the robber
        var robberX = 262, robberY = 120;
        
        if (0 <= this.robberPosition && this.robberPosition < 3) {
            robberX += tileWidth * this.robberPosition;
        }
        else if (3 <= this.robberPosition && this.robberPosition < 7) {
            robberX += tileWidth * (this.robberPosition - 3) - 0.5 * tileWidth;
            robberY += tileHeight;
        }
        else if (7 <= this.robberPosition && this.robberPosition < 12) {
            robberX += tileWidth * (this.robberPosition - 7) - 1 * tileWidth;
            robberY += 2 * tileHeight;
        }
        else if (12 <= this.robberPosition && this.robberPosition < 16) {
            robberX += tileWidth * (this.robberPosition - 12) - 0.5 * tileWidth;
            robberY += 3 * tileHeight;
        }
        else {
            robberX += tileWidth * (this.robberPosition - 16);
            robberY += 4 * tileHeight;
        }
        
        this.drawCircle(ctx, robberX, robberY, 30);
    }
}

// Function to randomly shuffle an array
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

