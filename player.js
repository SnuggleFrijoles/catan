"use strict";

class Player {
    // Constructor
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.points = 0;
        this.longestRoad = false;
        this.largestArmy = false;
        this.devCards = [];
        this.resources = {
            brick: 0,
            lumber: 0,
            ore: 0,
            grain: 0,
            wool: 0
        };
        // Trick to make array of 0's
        this.ownedTiles = new Array(19 + 1).join('0').split('').map(parseFloat);
        this.settlements = [];
        this.cities = [];
    }
}
