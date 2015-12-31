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
    //requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Get number of players
var numPlayers;
/*****************************************************************
 *Commented out the following so that the prompts for the players don't come up
 *****************************************************************/
/*do {
    numPlayers = prompt("Enter number of players (2-4): ");
} while (2 > numPlayers || numPlayers > 4);*/
/*****************************************************************
 *                Commented out stuff ends here
 *****************************************************************/

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

// Get an adequate board

var goodBoard , rendered = false, makingBoard = false;

// Make a couple functions in order to get around things being too fast
function getGoodBoard () {
    // Make a new board
    game.newBoard();

    // Render the new board
    game.board.render(game.players);

    // Ask if board is okay after a slight delay
    setTimeout(confirmBoard, 100);
}

function confirmBoard() {
    var boardOkay = prompt("Is this board good? (y/n:)");
    if (boardOkay != 'y' && boardOkay != 'Y')
        getGoodBoard();
    else
        buildInitalSetup();
}

// Get a good board
getGoodBoard();

function buildInitalSetup() {
    // Have players build their first two settlements and roads
    for (var i = 1; i <= numPlayers; i++) {
        game.buildItem(2, true);
        game.incTurn();
    }
    for (i = 1; i <= numPlayers; i++) {
        game.buildItem(2, true);
        game.incTurn();
    }
    game.board.render(game.players);
    setTimeout(main, 100);
}

function main() {
    // Run a game.nextTurn() cycle until the game is over
    while (!game.over) {
        game.nextTurn();
    }
}
