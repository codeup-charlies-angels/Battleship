// set up board for p2 ships.

/*
ship type/ size / number per player
battleship / 4    1
cruiser /    3    2
destroyer /  2    3
submarine /  1    4
<<<<<<< HEAD
*/


//
//
// Define Globals
//
//
let gameBoard2SizeX=10;
let gameBoard2SizeY=10;
let gameScale2=50;
let rect2;
let gbLeft2;
let gbTop2;


let active2 = false;
let currentX2 = undefined;
let currentY2 = undefined;
let initialX2 = undefined;
let initialY2 = undefined;
let xOffset2 = 0;
let yOffset2 = 0;

let PlayerGameBoard2;
let GameBoardContainer2;
let gameBoardArray2=createArray(gameBoard2SizeX+1,gameBoard2SizeY+1);
//
//
// Useful functions
//
//

function dragStart(e) {
    let curLoc = getLocation(e.target);
    if(Ship.dragItem) {
        xOffset2 = curLoc.left;
        yOffset2 = curLoc.top;
        initialX2 = e.clientX - xOffset2;
        initialY2 = e.clientY - yOffset2;
        if (Ship.dragItem.direction) {
            Ship.relMouseX=e.offsetX;
            Ship.relMouseY=e.offsetY;
        } else {
            Ship.relMouseX=e.offsetY;
            Ship.relMouseY=e.offsetX;
        }

        if (e.target === Ship.dragItem.element) {
            active2 = true;
            Ship.dragItem.element.style.zIndex = "1000";
        }
    }
}

function dragEnd(e) {
    initialX2 = currentX2;
    initialY2 = currentY2;

    active2 = false;
}

function drag(e) {
    Ship.mouseX=e.clientX;
    Ship.mouseY=e.clientY;
    if (active2) {
        e.preventDefault();
        if (Ship.dragItem.direction) {
            currentX2 = e.clientX - initialX2;
            currentY2 = e.clientY - initialY2;
        }else{
            currentX2 = e.clientX - initialX2;
            currentY2 = e.clientY - initialY2;
        }

        setTranslate(currentX2, currentY2, Ship.dragItem.element);
    }
}
function setTranslate(xPos, yPos, el) {
    el.style.position="absolute";
    el.style.left=xPos+"px";
    el.style.top=yPos+"px";
    //el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function createArray(length) {
    let arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

function getLocation(el) {
    if (typeof el !== "object"){
        el = document.getElementById(el);
    }
    const rect2 = el.getBoundingClientRect();
    return {
        left: rect2.left + window.scrollX,
        top: rect2.top + window.scrollY
    };
}

function resizeEverything(){

    gameScale2 = ((window.innerHeight/15));
    // gameScale2=50;

    PlayerGameBoard2.style.width=(gameBoard2SizeX+1)*gameScale2+"px";
    PlayerGameBoard2.style.height=(gameBoard2SizeY+1)*gameScale2+"px";
    PlayerGameBoard2.style.fontSize=gameScale2/2+"px";

    rect2 = PlayerGameBoard2.getBoundingClientRect();
    gbLeft2 = rect2.left + window.scrollX;
    gbTop2 = rect2.top + window.scrollY;

    for(let y=0;y<gameBoard2SizeY+1;y++){
        for (let x=0;x<gameBoard2SizeX+1;x++){
            let gridBox = gameBoardArray2[x][y];
            gridBox.style.top = gbTop2 + ((y) * gameScale2) + "px";
            gridBox.style.left = gbLeft2 + ((x) * gameScale2) + "px";
            gridBox.style.width=gameScale2+"px";
            gridBox.style.height=gameScale2+"px";
            gridBox.style.lineHeight = gameScale2+"px";
        }
    }
    for(let i=0;i<Ship.playerShips.length;i++){
        let ship = Ship.playerShips[i];
        ship.element.style.transition ="none";
        ship.element.style.fontSize=gameScale2/1.5+"px";
        ship.move(ship.lastLocation);

    }
}

function initializeGameBoard(){
    // Create the gameBoard div
    PlayerGameBoard2=document.createElement("div");   // Create a <button> element;
    PlayerGameBoard2.id = "PlayerGameBoard2";
    GameBoardContainer2=document.getElementById("GameBoardContainer2");
    GameBoardContainer2.appendChild(PlayerGameBoard2);

    rect2 = PlayerGameBoard2.getBoundingClientRect();
    gbLeft2 = rect2.left + window.scrollX;
    gbTop2 = rect2.top + window.scrollY;
    PlayerGameBoard2.style.width=(gameBoard2SizeY+1)*gameScale2+"px";
    PlayerGameBoard2.style.height=(gameBoard2SizeX+1)*gameScale2+"px";


    PlayerGameBoard2.addEventListener('mousedown', function(event){dragStart(event)}, false);
    PlayerGameBoard2.addEventListener('mouseup', function(event){dragEnd(event)}, false);
    PlayerGameBoard2.addEventListener('mousemove', function(event){drag(event)}, false);

    PlayerGameBoard2.addEventListener('touchstart', function(event){dragStart(event)}, false);
    PlayerGameBoard2.addEventListener('touchend', function(event){dragEnd(event)}, false);
    PlayerGameBoard2.addEventListener('touchmove', function(event){drag(event)}, false);
    document.onkeydown = function (e) {
        e = e || window.event;
        if(Ship.dragItem) {
            if (e.key === "Shift") {
                Ship.dragItem.rotate(e);
                Ship.dragItem.rotateKey = !Ship.dragItem.rotateKey;
            }
        }
    };

    for(let y=0;y<gameBoard2SizeY+1;y++){
        for (let x=0;x<gameBoard2SizeX+1;x++){
            let gridBox = document.createElement("div");
            gridBox.style.width = gameScale2+"px";
            gridBox.style.height = gameScale2+"px";
            if (y===0 || x===0){
                gridBox.className = "organizerGridBox";
                if (y===0 && x!==0){
                    gridBox.textContent=""+x;
                }
                if (x===0 && y!==0){
                    gridBox.textContent=""+String.fromCharCode(y + 64);
                }
                if (y===0&&x===0){
                    gridBox.style.backgroundColor="orange";
                }
            }else {
                gridBox.id = "" + String.fromCharCode(y + 64) + x;
                gridBox.className = "gameGridBox";
            }
            gameBoardArray2[x][y] = gridBox;
            PlayerGameBoard2.appendChild(gridBox);
        }
    }
}




=======

*/
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb

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
<<<<<<< HEAD
var random10 = (function () {
    return Math.floor((Math.random() * 10) + 1)
=======
var randomX = (function (x) {
    return Math.floor((Math.random() * x) + 1)
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
});
var shipHead;
var batCounter = 0;
var shotLog = [];
var copyBoard = [];
<<<<<<< HEAD
=======
var p2TargetBoard=[];
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
var score = 0;

// fuction to create board array.

var rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];


<<<<<<< HEAD
=======
function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
function arrayBuilder(item, index, array) {
    for (var i = 1; i < 11; i++) {
        var x = (item + i);
        x = x.toString();
        x = x.toUpperCase();
        // console.log(x); //debug
        boardArray.push(x);
<<<<<<< HEAD
=======
        copyBoard.push(x);
        p2TargetBoard.push(x);
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
    }
}

// creates an array with all the coordinate combinations for game grid.
<<<<<<< HEAD
rows.forEach(arrayBuilder)
copyBoard = boardArray;

=======
rows.forEach(arrayBuilder);
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
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
<<<<<<< HEAD

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

=======

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
    var x = randomX(10);// random int 1-10
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

>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
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
        console.log("value of ex before operation: " + (yNum + blx));        // debug data, comment out when not needed.
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
<<<<<<< HEAD
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
=======
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

//********************************* p2 firing mechanism *****************************//

var hit= false;
var lastcoord = '';

function p2Firing(hit) {
    if (hit){
        // if hit is true then add or 1 to find an adjecent square
        var y = lastcoord.charAt(0);
        var x = lastcoord.charAt(1) + lastcoord.charAt(2);
        var yNum= rowAlphaToNum(y);
        switch (random2) {
            case 0 :

                switch (random2) {
                    case 0 :
                        x++;
                        break;
                    case 1:
                        x--;
                        break;
                }
                break;
            case 1:
                switch (random2){
                    case 0 :
                        yNum++;
                        break;
                    case 1:
                        yNum--;
                        break;
                }
                break;
            default:
                x++
        }

        y = rowNumToAlpha(yNum);
        coord = y + x;

    }else{
        // if hit is false, select a random coord to fire on.
        var coord = randoCoordinate();
        while (!p2TargetBoard.includes(coord)){
            coord = randoCoordinate();
        }


    }
    return coord;
}


//****************************** p1 firing mechanism ********************************//

//function firingPrompt() {
    wait(2000);
    var target = prompt("Enter firing Coordinates");
    //if (target != null) {
        target=target.toUpperCase();
   // }
     // while   (!(copyBoard.includes(target))){
     //     target = prompt("Enter firing Coordinates");
     //     console.log("oust of range");
     //     alert( target + " is out of range.");
     // }
    if(!copyBoard.includes(target)){
        alert( target + " is out of range.");
        firingPrompt();
        return target;
    }

    p1Target(target);
    firingPrompt();
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
    return target;

}

function p1Target(coord) {
    coord = coord.toUpperCase();
    console.log(coord);

    let response = false;
    if (shotLog.includes(coord)) {
        console.log("You have already fired on this grid.");
<<<<<<< HEAD
=======
        alert("You have already fired on this grid.");
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
        response = true;
    } else if (boardArray.includes(coord)) {
        shotLog.push(coord);
        console.log("That is a miss, you hit open water.");
<<<<<<< HEAD
=======
        alert("That is a miss, you hit open water.");
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
        response = true;
    } else {
        shotLog.push(coord);
        console.log("that's a confirmed hit!!!");
<<<<<<< HEAD
=======
        alert("that's a confirmed hit!!!");
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
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


<<<<<<< HEAD
//firingPrompt();
=======
firingPrompt();
>>>>>>> f8913e4907aedad2196656863009aa09170d2cdb
