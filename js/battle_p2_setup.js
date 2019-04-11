// set up board for p2 ships.

/*
ship type/ size / number per player
battleship / 4    1
cruiser /    3    2
destroyer /  2    3
submarine /  1    4

*/

// global variables. May change to local if not needed globally
var boardArray = [];
var p2Ships = ["battleship", "cruiser", "destroyer", "submarine"]; // may not be needed
var p2BattleShip = [4, 1];   // size, how many times it can be placed.
var p2Cruiser = [3, 2];      // size, how many times it can be placed.
var p2Destroyer = [2, 3];    // size, how many times it can be placed.
var p2sub = [1, 4];          // size, how many times it can be placed.
var random2 = (function () {
    return Math.floor(Math.random() * 2)
}); //randomizer for vertical or horizontal placement
var randomX = (function (x) {
    return Math.floor((Math.random() * x) + 1)
});
var shipHead;
var batCounter = 0;
var shotLog = [];
var copyBoard = [];
var score = 0;

// fuction to create board array.

var rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];


function arrayBuilder(item, index, array) {
    for (var i = 1; i < 11; i++) {
        var x = (item + i);
        x = x.toString();
        x = x.toUpperCase();
        // console.log(x); //debug
        boardArray.push(x);
    }
}

// creates an array with all the coordinate combinations for game grid.
rows.forEach(arrayBuilder)
copyBoard = boardArray;

// find row
function findRow() {
    //change random int to a corresponding letter
    switch (random10()) {
        case 1:
            return "A";

        case 2:
            return "B";

        case 3:
            return "C";

        case 4:
            return "D";

        case 5:
            return "E";

        case 6:
            return "F";

        case 7:
            return "G";

        case 8:
            return "H";

        case 9:
            return "I";

        case 10:
            return "J";

        default:
            return "A";
    }
}

// changes num to alpha
function rowNumToAlpha(y) {
    //change random int to a corresponding letter
    switch (y) {
        case 1:
            return "A";

        case 2:
            return "B";

        case 3:
            return "C";

        case 4:
            return "D";

        case 5:
            return "E";

        case 6:
            return "F";

        case 7:
            return "G";

        case 8:
            return "H";

        case 9:
            return "I";

        case 10:
            return "J";

        default:
            return "A";
    }
}

// changes row alpha to numeric equivalent. lol is this redundant? I don't know how else I would do this.

function rowAlphaToNum(y) {
    //change alpha to a corresponding number
    switch (y) {
        case "A":
            return 1;

        case "B":
            return 2;

        case "C":
            return 3;

        case "D":
            return 4;

        case "E":
            return 5;

        case "F":
            return 6;

        case "G":
            return 7;

        case "H":
            return 8;

        case "I":
            return 9;

        case "J":
            return 10;

        default:
            return 1;
    }
}


// find random coordinates for the head of the ship
function randoCoordinate() {
    var y = findRow(); //random alpha A-J
    var x = random10();// random int 1-10
    shipHead = y + x;
    return shipHead;
}

// ship selector
function shipSelector(item) {
    switch (item) {
        case "battleship":
            //console.log(p2BattleShip);
            return p2BattleShip;

        case "cruiser":
            //console.log(p2Cruiser);
            return p2Cruiser;

        case "destroyer":
            // console.log(p2Destroyer);
            return p2Destroyer;

        case "submarine":
            // console.log(p2sub);
            return p2sub;

        default:
            return console.error("Error at shipSelector" + item);

    }
}

// below for testing purposes.
// for (var i = 0; i < p2Ships.length; i++){
//     console.log(p2Ships[i]);
//     console.log(shipSelector(p2Ships[i]));
// }

// test placement array against board array where arr is the placement array
function testBrdArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        // check each arr element to see if its in board array
        if (boardArray.includes(arr[i])) {
            console.log(i);
        } else {

            return false;
        }

    }
    return true;
}

function remElFromArr(item) {
    return delete boardArray[boardArray.indexOf(item)];

}

// find grids for ship to be placed horizontally.
function placeHorz(blx) {
    var head = randoCoordinate();               // locate the head of the ship
    console.log(head);
    var y = (head.charAt(0));   // stores the y coordinate (alpha)
    console.log(y);
    var x = +(head.charAt(1) + head.charAt(2));        // stores the x coordiante (numeric)
    console.log(x);
    var coordArr = [];

    if ((x + blx) > 10) {               // if ship size + x value > 10, subtract size from x value.
        console.log("valye of ex befor operation: " + (x + blx));        // debug data, comment out when not needed.
        x = 10 - blx;
        console.log("Value of x after operation: " + x);             // debug data, comment out when not needed.
    }
    for (var i = 0; i < blx; i++) {              // stores all the needed coords in coord array
        x++;
        console.log(y + x);
        coordArr.push(y + x);                     // adding new coordinate to coord array to check against main coordinates array
    }
    // if true remove the coords from the board array and return true. else return false;
    if (testBrdArr(coordArr)) {
        console.log("Coords " + coordArr + " are in array");
        coordArr.forEach(remElFromArr);
        return true;
    } else {
        console.error("running placeHorz again");  // debug data
        placeHorz(blx);
    }
}

function placeVert(blx) {
    var head = randoCoordinate();               // locate the head of the ship
    console.log(head);
    var y = (head.charAt(0));   // stores the y coordinate (alpha)
    console.log(y);
    var x = +(head.charAt(1) + head.charAt(2));        // stores the x coordiante (numeric)
    console.log(x);
    var yNum = rowAlphaToNum(y);
    var coordArr = [];

    if ((yNum + blx) > 10) {               // if ship size + yNum value > 10, subtract size from yNum value.
        console.log("valye of ex before operation: " + (yNum + blx));        // debug data, comment out when not needed.
        yNum = 10 - blx;
        console.log("Value of x after operation: " + yNum);             // debug data, comment out when not needed.
    }
    for (var i = 0; i < blx; i++) {              // stores all the needed coords in coord array
        yNum++;
        y = rowNumToAlpha(yNum);
        console.log(y + x);
        coordArr.push(y + x);                     // adding new coordinate to coord array to check against main coordinates array
    }
    // if true remove the coords from the board array and return true. else return false;
    if (testBrdArr(coordArr)) {
        console.log("Coords " + coordArr + " are in array");
        coordArr.forEach(remElFromArr);
        return true;
    } else {
        console.error('running placeVert again'); // debug info
        placeVert(blx);
    }

}

// place ships on the grid and occupy the space. Remove grid points so as not to overlap ships
function placeShips(ship) {
    var ori = random2;                       // random int for vert or horz placement
    var size = ship[0];                       //blx from first element in shop array
    var i = ship[1];                        // how many times to place an instance the ship
    console.log("ship[1] = " + i);          // debug info
    for (i; i > 0; i--) {                       // loop for ship placement
        if (ori === 0) {
            placeHorz(size);
        } else {
            placeVert(size);
        }
        ori = random2;                      // roll for vert/horz/ placement
        batCounter++;
        console.log("**************************** ships placed = " + batCounter);            // debug info
    }
}

function p2BoardSetup(item) {
    var ship = shipSelector(item);

    placeShips(ship);

}

p2Ships.forEach(p2BoardSetup);

//********************************* p2 board setup complete *************************//

// board array seperated into rows and columns
// not working, the way I want.
/*function arrSepAndDisp() {
    var copBoardArr = boardArray;
    var i = 9;

    while (i < 100){
        copBoardArr[i] += "\n";
        i = i+10;
    }
    copBoardArr.forEach(function (item, inx, ray) {
        if(typeof (item) == "undefined" || item==="undefined"){
            ray[inx] = "xx";
        }

    });

    var strBoard = copBoardArr.join(",");
    console.log(strBoard);
}
*/

function firingPrompt() {
    var target = prompt("Enter firing Coordinates");

    // // while   (!(copyBoard.includes(target))){
    //      //target = prompt("Enter firing Coordinates");
    //      console.log("oust of range");
    //  //}


    p1Target(target);
    return target;

}

function p1Target(coord) {
    console.log(coord);
    var response = false;
    if (shotLog.includes(coord)) {
        console.log("You have already fired on this grid.");
        response = true;
    } else if (!boardArray.includes(coord)) {
        shotLog.push(coord);

        console.log("That is a miss, you hit open water.");
        response = true;
    } else {
        shotLog.push(coord);
        console.log("that's a confirmed hit!!!");
        score += 1;
        response = true;

    }
    if (score >= 17) {
        confirm("Congrats! You sunk all the enemy ships!");
        location.reload(true);
        response = false;
    }
    return response;
}


//firingPrompt();