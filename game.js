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
        else {
            // Move the robber
            var newRobberPosition;
            do {
                newRobberPosition = parseInt(prompt("Enter new robber position: "));
            } while (0 > newRobberPosition || newRobberPosition > 18);
            this.board.robberPosition = newRobberPosition;
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
}