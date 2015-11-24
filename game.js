"use strict";

//import Board from "board.js";

class Game {
    // Constructor
    constructor(players, ctx) {
        this.players = players;
        this.numPlayers = players.length;
        this.board = new Board();
        this.turn = 0;
        this.ctx = ctx;
        this.over = false;
    }

    // Method for creating a new board
    newBoard() {
        this.board = new Board();
    }

    // Method for next turn
    nextTurn() {
        // Produce resources
        this.produceResources();

        // Tell the player what they have
        alert(this.players[this.turn].name + ", here is your hand:\n" +
               "\t Lumber: " + this.players[this.turn].resources.lumber + "\n" +
               "\t Brick: " + this.players[this.turn].resources.brick + "\n" +
               "\t Grain: " + this.players[this.turn].resources.grain + "\n" +
               "\t Wool: " + this.players[this.turn].resources.wool + "\n" +
               "\t Ore: " + this.players[this.turn].resources.ore + "\n");

        // Trade
        this.trade();

        // Build
        this.build();

        // Render board
        this.board.render(this.players);

        // Increment turn
        this.incTurn();

        // TODO: Add support for playing development cards
        // Rules say dev cards can be played at any time during the turn
        // May have to make it sequential after some other part
    }

    // Method for rolling and resource production
    produceResources() {
        // Make a random roll
        var roll = this.diceRoll();
        console.log(this.turn + " " + roll);

        // Let the user know the roll
        alert("The roll was: " + roll);

        // Check for 7 roll
        if (roll != 7) {
            // Add necessary resources to players hands
            this.addResources(roll);
        }
        else {
            //check and get rid of cards if more than 7
            for (var i = 0; i < this.players.length; i++) {
                var player = this.players[i];
                var sumOfResources = 0;
                for (var key in player.resources) {
                    if (player.resources.hasOwnProperty(key)) {
                        sumOfResources += player.resources[key];
                    }
                }
                if (sumOfResources > 7) {
                    this.dropCards();
                }
            }

            // Move the robber
            var newRobberPosition;
            do {
                newRobberPosition = parseInt(prompt("Enter new robber position: "));
            } while ((0 > newRobberPosition || newRobberPosition > 18) && newRobberPosition == this.board.robberPosition);
            this.board.robberPosition = newRobberPosition;

            this.board.render(this.players);

            // TODO: Allow player to steal from someone on the new robber tile
        }
    }

    // Method for mangaging trading
    trade() {
        // Ask if user wants to trade
        var willTrade = prompt(this.players[this.turn].name + ", would you like to trade? (y/n)");
        if (willTrade == "stop")
            this.over = true;

        while (willTrade == "y" || willTrade == "Y") {
            // TODO: Add support for maritime and player-player trading

            // Get what item they would like to trade
            var tradeWhat, tradeFor;
            do {
                tradeWhat = parseInt(prompt(this.players[this.turn].name + ", what would you like to trade: (1-5)\n" +
                                       "\t 1) Lumber (You have " + this.players[this.turn].resources.lumber + ")\n" +
                                       "\t 2) Brick (You have " + this.players[this.turn].resources.brick + ")\n" +
                                       "\t 3) Grain (You have " + this.players[this.turn].resources.grain + ")\n" +
                                       "\t 4) Wool (You have " + this.players[this.turn].resources.wool + ")\n" +
                                       "\t 5) Ore (You have " + this.players[this.turn].resources.ore + ")\n"));
            } while (tradeWhat < 1 && tradeWhat > 5);

            // Get the corresponding resource
            switch (tradeWhat) {
                case 1:
                    tradeWhat = "lumber";
                    break;
                case 2:
                    tradeWhat = "brick";
                    break;
                case 3:
                    tradeWhat = "grain";
                    break;
                case 4:
                    tradeWhat = "wool";
                    break;
                case 5:
                    tradeWhat = "ore";
                    break;
                default:
                    tradeWhat = null;
                    break;
            }

            // Check if player has enough
            if (this.players[this.turn].resources[tradeWhat] >= 4) {
                // Decrement their resource
                this.players[this.turn].resources[tradeWhat] -= 4;

                // Get what resource they want to trade for
                do {
                    tradeFor = parseInt(prompt(this.players[this.turn].name + ", what would you like to trade for: (1-5)\n" +
                                           "\t 1) Lumber (You have " + this.players[this.turn].resources.lumber + ")\n" +
                                           "\t 2) Brick (You have " + this.players[this.turn].resources.brick + ")\n" +
                                           "\t 3) Grain (You have " + this.players[this.turn].resources.grain + ")\n" +
                                           "\t 4) Wool (You have " + this.players[this.turn].resources.wool + ")\n" +
                                           "\t 5) Ore (You have " + this.players[this.turn].resources.ore + ")\n"));
                } while (tradeFor != "lumber" && tradeFor != "brick" && tradeFor != "grain" && tradeFor != "wool" && tradeFor != "ore");

                switch (tradeFor) {
                    case 1:
                        tradeFor = "lumber";
                        break;
                    case 2:
                        tradeFor = "brick";
                        break;
                    case 3:
                        tradeFor = "grain";
                        break;
                    case 4:
                        tradeFor = "wool";
                        break;
                    case 5:
                        tradeFor = "ore";
                        break;
                    default:
                        tradeFor = null;
                        break;
                }

                // Add one resource
                this.players[this.turn].resources[tradeFor] += 1;
            }
            else
                alert("Sorry " + this.players[this.turn].name + ", you do not have enough " + tradeWhat + " to trade.");

            // Ask if they would like to trade again
            willTrade = prompt(this.players[this.turn].name + ", would you like to trade again? (y/n)");
        }
    }

    // Method for managing building
    build() {
        // Ask if player wants to build, loop until no
        var willBuild = prompt(this.players[this.turn].name + ", would you like to build anything? (y/n)");

        while (willBuild == "y" || willBuild == "Y") {
            // Get what item they would like to build
            var buildItem;
            do {
                buildItem = parseInt(prompt(this.players[this.turn].name + ", what would you like to build: (1-4)\n" +
                                       "\t 1) Road (1 lumber, 1 brick)\n" +
                                       "\t 2) Settlement (1 lumber, 1 brick, 1 grain, 1 wool)\n" +
                                       "\t 3) City (2 ore, 3 grain)\n" +
                                       "\t 4) Development Card (1 grain, 1 ore, 1 sheep)\n"));
            } while (buildItem < 1 || buildItem > 4);

            // Build the item
            this.buildItem(buildItem, false);

            // Ask if they would like to build again
            willBuild = prompt(this.players[this.turn].name + ", would you like to build again? (y/n)");
        }
    }

    // Method for incrementing turn
    incTurn() {
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
                    for (var j = 0; j < this.players.length; j++) {
                        // Loop through players owned tiles
                        var player = this.players[j];

                        // If the player has atleast one ownership on that tile, give resource
                        var ownership = player.ownedTiles[tile.id];
                        if (ownership > 0)
                            player.resources[tile.resourceName] += ownership;
                    }
                }
            }
        }
    }

    //method for dropping cards if you have more than 7 cards
    dropCards() {
        //TODO: make this method
        console.log("You have to get rid of cards!");
    }

    // Method for building an item
    buildItem(item, initial) {
        // Get player resources
        var resources = this.players[this.turn].resources;

        // Do appropriate action
        switch (item) {
            case 1:
                if (!initial) {
                    // Check if player has resources for road
                    if (resources.brick >= 1 && resources.lumber >= 1) {
                        // Decrement resources
                        this.players[this.turn].resources.brick -= 1;
                        this.players[this.turn].resources.lumber -= 1;


                    }
                    else {
                        alert("Sorry " + this.players[this.turn].name + ", you do not have the resources to build that.");
                        break;
                    }
                }

                // TODO: Get location of build site
                // TODO: Draw new road at location
                // TODO: Check if player has longest road

                break;
            case 2:
                // Check if this is the inital build
                if (!initial) {
                    // Check if player has resources for settlement
                    if (resources.brick >= 1 && resources.lumber >= 1 && resources.grain >= 1 && resources.wool >= 1) {
                        // Decrement resources
                        this.players[this.turn].resources.brick -= 1;
                        this.players[this.turn].resources.lumber -= 1;
                        this.players[this.turn].resources.grain -= 1;
                        this.players[this.turn].resources.wool -= 1;
                    }
                    else {
                        alert("Sorry " + this.players[this.turn].name + ", you do not have the resources to build that.");
                        break;
                    }
                }

                // Get location of build site
                // TODO: Make sure location is valid
                // Sites have to be atleast two spots away from a previous city or settlement
                var buildSite;

                do {
                    buildSite = parseInt(prompt(this.players[this.turn].name + ", enter the build site index for your settlement: "));
                } while(buildSite < 0 || buildSite > 53 || this.board.usedBuildSites.indexOf(buildSite) != -1);

                // Add the index of the settlement build site to the player data
                this.players[this.turn].settlements.push(buildSite);

                // TODO: Add the tile to the players owndedTiles

                // Render to draw new settlement at location
                this.board.render(this.players);

                // Add victory points
                this.players[this.turn].points += 1;
                break;
            case 3:
                // Check if player has resources for city
                if (resources.ore >= 3 && resources.grain >= 2) {
                    // Check if player has a valid settlement to turn into a city
                    if (this.players[this.turn].settlements.length >= 1) {

                        // Decrement resources
                        this.players[this.turn].resources.ore -= 3;
                        this.players[this.turn].resources.grain -= 2;

                        // TODO: Get location of build site
                        // TODO: Draw new city at location

                        // Add victory points
                        this.players[this.turn].points += 1;
                    }
                    else
                        alert("Sorry " + this.players[this.turn].name + ", you do not have a settlement to build on.");
                }
                else
                    alert("Sorry " + this.players[this.turn].name + ", you do not have the resources to build that.");
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
                    alert("Sorry " + this.players[this.turn].name + ", you do not have the resources to build that.");
                break;
            default:
                // Give error
                alert("Not a valid item.");
                break;
        }
    }
}
