/**
 * Created by Isaac on 10/16/15.
 */

"use strict";

//import Player from "player.js";
//import Game from "game.js";

// Get the page bounds
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    pageWidth = w.innerWidth || e.clientWidth || g.clientWidth,
    pageHeight = w.innerHeight || e.clientHeight || g.clientHeight;

// Get number of players
var numPlayers;
do {
    numPlayers = prompt("Enter number of players: ");
} while (2 > numPlayers || numPlayers > 4);

// Get player names and colors
var players = [];
var playerNames = [];
var playerColors = [];

for (var i = 1; i <= numPlayers; i++) {
    var playerName, color;

    // Get name and color, checking for blanks and duplicates
    do {
        playerName = prompt("Enter Player " + i + " name: ");
    } while (!playerName || playerNames.indexOf(playerName) != -1);

    do {
        color = prompt("Enter Player " + i + " color (Ex. blue, red, green, yellow): ");
    } while (!color || playerColors.indexOf(color) != -1);

    // Add new player to player list
    players.push(new Player(playerName, color));
    playerNames.push(playerName);
    playerColors.push(color);
}

// Setup new game
var game = new Game(players);

game.board.render(game.players);

// TODO: Have players build their first two settlements and roads
// TODO: Run a game.nextTurn() cycle until the game is over
