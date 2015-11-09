"use strict";

class Game {
    // Constructor
    constructor(players) {
        this.players = players;
        this.numPlayers = players.length;
        this.board = new Board();
        this.turn = 0;
    }
    
    // Method for next turn
    nextTurn() {
        // Make a random roll
        var roll = this.diceRoll();
        console.log(this.turn + " " + roll);
        
        // Check for 7 roll
        if (roll != 7) {
            // Add necessary resources to players hands
            this.addResources(roll);
        }
        else {
            // Move the robber
            var newRobberPosition;
            do {
                newRobberPosition = parseInt(prompt("Enter new robber position: "));
            } while (0 > newRobberPosition || newRobberPosition > 18);
            this.board.robberPosition = newRobberPosition;
        }
        
        // Ask if player wants to build, loop until no
        var willBuild = prompt(this.players[turn].name + ", would you like to build anything? (y/n)");
        
        while (willBuild == "y" || willBuild == "Y") {
            // Get what item they would like to build
            var buildItem;
            do {
                buildItem = prompt(this.players[turn].name + ", what would you like to build: (1-4)\n" + 
                                       "\t 1) Road (1 lumber, 1 brick)\n" +
                                       "\t 2) Settlement (1 lumber, 1 brick, 1 grain, 1 wool)\n" +
                                       "\t 3) City (2 ore, 3 grain)\n" +
                                       "\t 4) Development Card (1 grain, 1 ore, 1 sheep)\n");
            } while (buildItem < 1 || buildItem > 4);
             
            // Build the item
            this.build(buildItem);
            
            // Ask if they would like to build again
            willBuild = prompt(this.players[turn].name + ", would you like to build again? (y/n)");
        }
       
        
        // Render board
        game.board.render(ctx);
        
        // Increment turn
        this.turn = (this.turn + 1) % this.numPlayers;
    }
    
    // Method for dice roll
    diceRoll() {
        // Sum two dice rolls 1-6
        return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    }
    
    // Method for adding resources based on roll
    addResources(roll) {
        // Loop through the board tiles
        var tiles = this.board.tiles;
        for (var i = 0; i < tiles.length; i++) {
            // Check if tile value matches roll
            var tile = tiles[i];
            if (tile.value == roll) {
                // Check if robber is on that tile
                if (this.board.robberPosition != tile.id) {
                    // See if any players are on that tile
                    for (var j = 0; j < players.length; j++) {
                        // Loop through players owned tiles
                        var player = players[j];

                        // If the player has atleast one ownership on that tile, give resource
                        var ownership = player.ownedTiles[tile.id];
                        if (ownership > 0)
                            player.resources[tile.resourceName] += ownership;
                    }
                }
            }
        }
    }
    
    // Method for building an item
    build(buildItem) {
        // Get player resources
        var resources = this.players[this.turn].resources;
        
        // Do appropriate action
        switch (buildItem) {
            case 1:
                // Check if player has resources for road
                if (resources.brick >= 1 && resources.lumber >= 1) {
                    // Decrement resources
                    this.players[this.turn].resources.brick -= 1;
                    this.players[this.turn].resources.lumber -= 1;
                    
                    // TODO: Check if player has longest road
                }
                else
                    alert("Sorry " + this.players[turn].name + ", you do not have the resources to build that.");
                break;
            case 2:
                // Check if player has resources for settlement
                if (resources.brick >= 1 && resources.lumber >= 1 && resources.grain >= 1 && resources.wool >= 1) {
                    // Decrement resources
                    this.players[this.turn].resources.brick -= 1;
                    this.players[this.turn].resources.lumber -= 1;
                    this.players[this.turn].resources.grain -= 1;
                    this.players[this.turn].resources.wool -= 1;
                    
                    // Add victory points
                    this.players[this.turn].points += 1;
                }
                else
                    alert("Sorry " + this.players[turn].name + ", you do not have the resources to build that.");
                break;
            case 3:
                // Check if player has resources for city
                if (resources.ore >= 2 && resources.grain >= 3) {
                    // TODO: Check if player has a valid settlement to turn into a city
                    
                    // Decrement resources
                    this.players[this.turn].resources.ore -= 2;
                    this.players[this.turn].resources.grain -= 3;
                    
                    // Add victory points
                    this.players[this.turn].points += 1;
                }
                else
                    alert("Sorry " + this.players[turn].name + ", you do not have the resources to build that.");
                break;
            case 4:
                // Check if player has resources for development card
                if (resources.ore >= 1 && resources.grain >= 1 && resources.wool >= 1) {
                    // Decrement resources
                    this.players[this.turn].resources.ore -= 1;
                    this.players[this.turn].resources.grain -= 1;
                    this.players[this.turn].resources.wool -= 1;
                    
                    // TODO: Add development card to players hand
                }
                else
                    alert("Sorry " + this.players[turn].name + ", you do not have the resources to build that.");
                break;
            default:
                // Give error
                alert("Not a valid item.");
                break;
        }
    }
}