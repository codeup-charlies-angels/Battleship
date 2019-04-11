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
    if(Ship.dragItem) {
        xOffset = curLoc.left;
        yOffset = curLoc.top;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (Ship.dragItem.direction) {
            Ship.relMouseX=e.offsetX;
            Ship.relMouseY=e.offsetY;
        } else {
            Ship.relMouseX=e.offsetY;
            Ship.relMouseY=e.offsetX;
        }

        if (e.target === Ship.dragItem.element) {
            active = true;
            Ship.dragItem.element.style.zIndex = "1000";
        }
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e) {
    Ship.mouseX=e.clientX;
    Ship.mouseY=e.clientY;
    if (active) {
        e.preventDefault();
        if (Ship.dragItem.direction) {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }else{
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        setTranslate(currentX, currentY, Ship.dragItem.element);
        console.log(currentX + ", " + currentY);
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
    GameBoard.style.fontSize=gameScale/2+"px";

    rect = GameBoard.getBoundingClientRect();
    gbLeft = rect.left + window.scrollX;
    gbTop = rect.top + window.scrollY;

    for(let y=0;y<gameBoardSizeY+1;y++){
        for (let x=0;x<gameBoardSizeX+1;x++){
            let gridBox = gameBoardArray[x][y];
            gridBox.style.top = gbTop + ((y) * gameScale) + "px";
            gridBox.style.left = gbLeft + ((x) * gameScale) + "px";
            gridBox.style.width=gameScale+"px";
            gridBox.style.height=gameScale+"px";
            gridBox.style.lineHeight = gameScale+"px";
        }
    }
    for(let i=0;i<Ship.playerShips.length;i++){
        let ship = Ship.playerShips[i];
        ship.element.style.transition ="none";
        ship.element.style.fontSize=gameScale/1.5+"px";
        ship.move(ship.lastLocation);

    }
}

//
//
// Game Building Functions
//
//

function initializeGameBoard(){
    // Create the gameBoard div
    GameBoard=document.createElement("div");   // Create a <button> element;
    GameBoard.id = "GameBoard";
    GameBoardContainer=document.getElementById("GameBoardContainer");
    GameBoardContainer.appendChild(GameBoard);

    rect = GameBoard.getBoundingClientRect();
    gbLeft = rect.left + window.scrollX;
    gbTop = rect.top + window.scrollY;
    GameBoard.style.width=(gameBoardSizeY+1)*gameScale+"px";
    GameBoard.style.height=(gameBoardSizeX+1)*gameScale+"px";


    GameBoardContainer.addEventListener('mousedown', function(event){dragStart(event)}, false);
    GameBoardContainer.addEventListener('mouseup', function(event){dragEnd(event)}, false);
    GameBoardContainer.addEventListener('mousemove', function(event){drag(event)}, false);

    GameBoardContainer.addEventListener('touchstart', function(event){dragStart(event)}, false);
    GameBoardContainer.addEventListener('touchend', function(event){dragEnd(event)}, false);
    GameBoardContainer.addEventListener('touchmove', function(event){drag(event)}, false);
    document.onkeydown = function (e) {
        // console.log(e);
        e = e || window.event;
        if(Ship.dragItem) {
            if (e.key === "Shift") {
                console.log("Shift pressed");
                Ship.dragItem.rotate(e);
                Ship.dragItem.rotateKey = !Ship.dragItem.rotateKey;
            }
        }
    };

    for(let y=0;y<gameBoardSizeY+1;y++){
        for (let x=0;x<gameBoardSizeX+1;x++){
            let gridBox = document.createElement("div");
            gridBox.style.width = gameScale+"px";
            gridBox.style.height = gameScale+"px";
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
            gameBoardArray[x][y] = gridBox;
            document.getElementById("GameBoard").appendChild(gridBox);
        }
    }
}

class Ship {
    constructor(length) {
        this.id = Ship.incrementId();
        this.length = length;
        this.direction = true;
        this.lastDirection=this.direction;
        this.lastLocation=null;

        this.rotated=false;
        this.rotateKey = false;

        // Auto run on create
        this.element=document.createElement("div");   // Create a <button> element;

        this.element.id = "Ship" + this.id;
        this.element.className = "GamePiece_Ship";
        this.element.textContent = this.id;
        let me=this;
        this.element.addEventListener('mousedown', function(event){
                Ship.dragItem=me;
                me.element.style.transition ="none";
            }, false);
        this.element.addEventListener('mouseup', function(event){
                me.element.style.zIndex="100";
                Ship.dragItem=undefined;
                me.element.style.transition ="0.2s ease";
                me.element.style.transitionProperty ="top, left";

                let drect = me.element.getBoundingClientRect();
                let x;
                let y;
                x = initialX - (gameScale / 2); //x position within the element.
                y = initialY - (gameScale / 2);
                me.element.style.visibility="hidden";
                let validSpot=true;
                let elemUnder = document.elementFromPoint(Ship.mouseX-x ,Ship.mouseY-y);
                for(let ci=0;ci<me.length;ci++){
                    let chkBlock;
                    if (me.direction) {
                        chkBlock = document.elementFromPoint(Ship.mouseX - x, Ship.mouseY - y + (ci * gameScale));
                    }else{
                        chkBlock = document.elementFromPoint(Ship.mouseX - x + (ci * gameScale), Ship.mouseY - y);
                    }
                    if (chkBlock.className.indexOf("gameGridBox") ===-1){
                        validSpot=false;
                        break;
                    }
                }
                if(validSpot) {
                    elemUnder.style.backgroundColor="red";
                    me.move(elemUnder);
                    console.log("moved to elemUnder");
                }else{
                    me.move(me.lastLocation,me.lastDirection);
                }
                me.element.style.visibility="visible";
            }, false);
        this.orient();
        Ship.playerShips.push(this);
        GameBoardContainer.appendChild(this.element);
    }
    orient(e){
        let tx=initialX;
        initialX=initialY;
        initialY=tx;
        if (this.direction) {
            this.height = Number((gameScale * this.length)-2);
            this.width = Number(gameScale-2);
            setTranslate(Ship.mouseX - Ship.relMouseX, Ship.mouseY - Ship.relMouseY, this.element);
        } else {
            this.width = Number((gameScale * this.length)-2);
            this.height = Number(gameScale-2);
            setTranslate(Ship.mouseX - Ship.relMouseY, Ship.mouseY - Ship.relMouseX, this.element);
        }
        console.log(Ship.mouseX + ", " + Ship.mouseY);
        console.log("Setting X:"+this.element.style.left);
        console.log("Setting Y:"+this.element.style.top);

        this.element.style.height = this.height+'px';
        this.element.style.width = this.width+'px';
        this.element.style.lineHeight = this.element.style.height;
    }
    rotate(e){
        //Only rotate once per shift press
        if (!this.rotateKey) {
            this.lastDirection=this.direction;
            this.direction = !this.direction;
            // console.log(this.direction);
            this.rotateKey=true;
            this.rotated=!this.rotated;
            this.orient(e);
        }
    }
    move(locationID, dir) {
        if (dir !== undefined){this.direction = dir;}
        if (locationID === undefined){locationID = this.lastLocation}
        this.lastLocation = locationID;

        this.orient();
        //Set the location of the ship
        let loc = getLocation(locationID);
        loc.left=parseFloat(loc.left);
        loc.top=parseFloat(loc.top);
        this.element.style.position = "absolute";
        this.element.style.top = (loc.top + 1) + 'px';
        this.element.style.left = (loc.left + 1) + 'px';
        this.element.style.lineHeight = this.element.style.height;
    }

    //Class variable to track all ships
    static playerShips = [];
    static dragItem;
    static mouseX;
    static mouseY;

    //Auto generate an ID for the ship
    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++;
        return this.latestId;
    }
}



initializeGameBoard();

//Create the 5 random ships of varying sizes
// for(let i=0;i<5;i++){
//     new Ship(i+1);
//     (Ship.playerShips[i]).move("A"+(i+1),true);
// }


resizeEverything();

// })();



