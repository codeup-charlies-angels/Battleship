// (function() {
"use strict";

//
//
// Define Globals
//
//
let gameBoardSizeX=10;
let gameBoardSizeY=10;

//
//
// Useful functions
//
//

function createArray(length) {
    let arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}


function getGridLocation(el) {
    el = document.getElementById(el);
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

//
//
// Game Building Functions
//
//
let GameBoard;
let gameBoardArray=createArray(gameBoardSizeX,gameBoardSizeY);

function initializeGameBoard(){
    document.documentElement.style.setProperty('--gameBoardSizeX', (gameBoardSizeX+1).toString());
    document.documentElement.style.setProperty('--gameBoardSizeY', (gameBoardSizeY+1).toString());

    // Create the gameBoard div
    GameBoard=document.createElement("div");   // Create a <button> element;
    GameBoard.id = "GameBoard";
    document.getElementById("GameBoardContainer").appendChild(GameBoard);

    const rect = GameBoard.getBoundingClientRect();
    let gbLeft = rect.left + window.scrollX;
    let gbTop = rect.top + window.scrollY;

    for(let x=0;x<gameBoardSizeX+1;x++){
        for (let y=0;y<gameBoardSizeY+1;y++){
            let gridBox = document.createElement("div");
            gridBox.style.top = gbTop + ((x) * 50) + "px";
            gridBox.style.left = gbLeft + ((y) * 50) + "px";
            if (y===0 || x===0){
                gridBox.className = "organizerGridBox";
            }else {
                gridBox.id = "" + String.fromCharCode(x + 64) + y;
                gridBox.className = "gameGridBox";
                gameBoardArray[y-1][x-1] = gridBox;
            }
            document.getElementById("GameBoard").appendChild(gridBox);
        }
    }
}

initializeGameBoard();

//Add drag and drop listeners on all the grid boxes
let grid = document.getElementsByClassName("gridbox");
for(let i=0;i<grid.length;i++){
    grid[i].addEventListener('drop', function(event){drop(event)}, false);
    grid[i].addEventListener('dragover', function(event){allowDrop(event)}, false);
}


class Ship {
    constructor(length) {
        this.id = Ship.incrementId();
        this.length = length;
        this.direction = true;
        this.moved=false;
        this.lastLocation=null;
        this.rotated=false;
        this.rotateKey = false;
        this.grabOffset=[0,0];
        // Auto run on create
        this.element=document.createElement("div");   // Create a <button> element;

        this.element.id = "Ship" + this.id;
        this.element.className = "GamePiece_Ship";
        this.element.textContent = this.id;
        let myID = this.id;
        this.element.addEventListener('click', function(event){this(event, myID)}, false);
        Ship.playerShips.push(this);
        document.body.appendChild(this.element);

    }
    rotate(){
        //Only rotate once per shift press
        if (!this.rotateKey) {
            this.direction = !this.direction;
            console.log(this.direction);
            this.rotateKey=true;
            this.rotated=!this.rotated;
            this.move(undefined,undefined,this.grabOffset);
        }
    }
    move(locationID, dir,offset) {
        if (offset === undefined){offset=[0,0]} // Set offset to 0,0 if not passed in.
        if (dir !== undefined){this.direction = dir;}
        if (locationID ===undefined){locationID = this.lastLocation}
        this.lastLocation = locationID;
        this.element.style.transition ="none";
        if (this.direction) {
            this.element.style.height = ((50 * this.length)-2) + 'px';
            this.element.style.width = 48 + 'px';
        } else {
            this.element.style.height = 48 + 'px';
            this.element.style.width = ((50 * this.length)-2) + 'px';
        }

        if (this.moved){
            //All moves after the first will be fast
            this.element.style.transition ="all 0.1s ease-out";
        }else{
            //Slower fly in on first move of ship from edge of screen.
            this.element.style.transition ="all 1s ease";
            this.element.style.top = "50%";
            this.element.style.left = "-"+(this.element.style.width);
        }

        //Convert the offset to 50px intervals
        console.log("Before conversion offset: " + offset);
        offset[0]=Math.floor(offset[0]/50)*50;
        offset[1]=Math.floor(offset[1]/50)*50;
        console.log("After conversion offset: " + offset);
        if (this.rotated){
            offset = [offset[1],offset[0]];
            this.rotated=false;
            console.log("After rotation offset: " + offset);
        }

        //Set the location of the ship
        let loc = getGridLocation(locationID);
        this.element.style.position = "absolute";
        this.element.style.top = ((loc.top + 1)- offset[1]) + 'px';
        this.element.style.left = ((loc.left + 1)- offset[0]) + 'px';
        this.element.style.lineHeight = this.element.style.height;
    }

    //Class variable to track all ships
    static playerShips = [];

    //Auto generate an ID for the ship
    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++;
        return this.latestId;
    }
}


//Create the 5 random ships of varying sizes
for(let i=0;i<5;i++){
    new Ship(i+1);
    (Ship.playerShips[i]).move("A"+(i+1),true);
}



// })();



