// (function() {
"use strict";

//
//
// Define Globals
//
//
let gameBoardSizeX=10;
let gameBoardSizeY=10;
let gameScale=50;
let rect;
let gbLeft;
let gbTop;


let active = false;
let currentX = undefined;
let currentY = undefined;
let initialX = undefined;
let initialY = undefined;
let xOffset = 0;
let yOffset = 0;

let GameBoard;
let GameBoardContainer;
let gameBoardArray=createArray(gameBoardSizeX+1,gameBoardSizeY+1);
//
//
// Useful functions
//
//

function dragStart(e) {
    let curLoc = getLocation(e.target);
    xOffset = curLoc.left;
    yOffset = curLoc.top;
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === Ship.dragItem) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;
        //console.log(currentX + ", " + currentY);
        setTranslate(currentX, currentY, Ship.dragItem);
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
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function resizeEverything(){

    gameScale = ((window.innerHeight/15));
    // gameScale=50;

    GameBoard.style.width=(gameBoardSizeX+1)*gameScale+"px";
    GameBoard.style.height=(gameBoardSizeY+1)*gameScale+"px";

    rect = GameBoard.getBoundingClientRect();
    gbLeft = rect.left + window.scrollX;
    gbTop = rect.top + window.scrollY;

    for(let x=0;x<gameBoardSizeX+1;x++){
        for (let y=0;y<gameBoardSizeY+1;y++){
            let gridBox = gameBoardArray[y][x];
            gridBox.style.top = gbTop + ((x) * gameScale) + "px";
            gridBox.style.left = gbLeft + ((y) * gameScale) + "px";
            gridBox.style.width=gameScale+"px";
            gridBox.style.height=gameScale+"px";
        }
    }
    for(let i=0;i<Ship.playerShips.length;i++){
        let ship = Ship.playerShips[i];
        ship.move(ship.lastLocation);
    }
}

//
//
// Game Building Functions
//
//

function initializeGameBoard(){
    document.documentElement.style.setProperty('--gameBoardSizeX', (gameBoardSizeX+1).toString());
    document.documentElement.style.setProperty('--gameBoardSizeY', (gameBoardSizeY+1).toString());

    // Create the gameBoard div
    GameBoard=document.createElement("div");   // Create a <button> element;
    GameBoard.id = "GameBoard";
    GameBoardContainer=document.getElementById("GameBoardContainer");
    GameBoardContainer.appendChild(GameBoard);

    rect = GameBoard.getBoundingClientRect();
    gbLeft = rect.left + window.scrollX;
    gbTop = rect.top + window.scrollY;
    GameBoard.style.width=(gameBoardSizeX+1)*gameScale+"px";
    GameBoard.style.height=(gameBoardSizeY+1)*gameScale+"px";


    GameBoardContainer.addEventListener('mousedown', function(event){dragStart(event)}, false);
    GameBoardContainer.addEventListener('mouseup', function(event){dragEnd(event)}, false);
    GameBoardContainer.addEventListener('mousemove', function(event){drag(event)}, false);

    GameBoardContainer.addEventListener('touchstart', function(event){dragStart(event)}, false);
    GameBoardContainer.addEventListener('touchend', function(event){dragEnd(event)}, false);
    GameBoardContainer.addEventListener('touchmove', function(event){drag(event)}, false);


    for(let x=0;x<gameBoardSizeX+1;x++){
        for (let y=0;y<gameBoardSizeY+1;y++){
            let gridBox = document.createElement("div");
            gridBox.style.width = gameScale+"px";
            gridBox.style.height = gameScale+"px";
            if (y===0 || x===0){
                gridBox.className = "organizerGridBox";
            }else {
                gridBox.id = "" + String.fromCharCode(x + 64) + y;
                gridBox.className = "gameGridBox";
            }
            gameBoardArray[y][x] = gridBox;
            document.getElementById("GameBoard").appendChild(gridBox);
        }
    }
    resizeEverything();
}

class Ship {
    constructor(length) {
        this.id = Ship.incrementId();
        this.length = length;
        this.direction = true;
        this.moved=false;
        this.lastLocation=null;
        this.grabOffset=[0,0];
        // Auto run on create
        this.element=document.createElement("div");   // Create a <button> element;

        this.element.id = "Ship" + this.id;
        this.element.className = "GamePiece_Ship";
        this.element.textContent = this.id;
        let me=this;
        this.element.addEventListener('mousedown', function(event){Ship.dragItem=event.target}, false);
        this.element.addEventListener('mouseup', function(event){
                Ship.dragItem=undefined;

                let drect = me.element.getBoundingClientRect();
                let x = event.clientX - drect.left; //x position within the element.
                let y = event.clientY - drect.top;

                me.element.style.visibility="hidden";
                me.move(document.elementFromPoint(event.clientX - x,event.clientY-y));
                me.element.style.visibility="visible";

            }, false);
        Ship.playerShips.push(this);
        GameBoardContainer.appendChild(this.element);
    }

    move(locationID, dir,offset) {
        if (offset === undefined){offset=[0,0]} // Set offset to 0,0 if not passed in.
        if (dir !== undefined){this.direction = dir;}
        if (locationID ===undefined){locationID = this.lastLocation}
        this.lastLocation = locationID;
        this.element.style.transition ="none";
        if (this.direction) {
            this.element.style.height = ((gameScale * this.length)-2) + 'px';
            this.element.style.width = (gameScale-2) + 'px';
        } else {
            this.element.style.height = (gameScale-2) + 'px';
            this.element.style.width = ((gameScale * this.length)-2) + 'px';
        }

        if (this.moved){
            //All moves after the first will be fast
            //this.element.style.transition ="all 0.1s ease-out";
        }else{
            //Slower fly in on first move of ship from edge of screen.
            //this.element.style.transition ="all 1s ease";
            this.element.style.top = "50%";
            this.element.style.left = "-"+(this.element.style.width);
        }

        //Convert the offset to gameScale intervals
        console.log("Before conversion offset: " + offset);
        offset[0]=Math.floor(offset[0]/gameScale)*gameScale;
        offset[1]=Math.floor(offset[1]/gameScale)*gameScale;
        console.log("After conversion offset: " + offset);
        if (this.rotated){
            offset = [offset[1],offset[0]];
            this.rotated=false;
            console.log("After rotation offset: " + offset);
        }

        //Set the location of the ship
        let loc = getLocation(locationID);
        this.element.style.position = "absolute";
        this.element.style.top = ((loc.top + 1)- offset[1]) + 'px';
        this.element.style.left = ((loc.left + 1)- offset[0]) + 'px';
        this.element.style.lineHeight = this.element.style.height;
    }

    //Class variable to track all ships
    static playerShips = [];
    static dragItem;

    //Auto generate an ID for the ship
    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++;
        return this.latestId;
    }
}



initializeGameBoard();


//Create the 5 random ships of varying sizes
for(let i=0;i<5;i++){
    new Ship(i+1);
    (Ship.playerShips[i]).move("A"+(i+1),true);
}



// })();



