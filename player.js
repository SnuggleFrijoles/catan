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
        this.ownedTiles = [];
    }
}