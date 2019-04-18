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

let PlayerGameBoard;
let GameBoardContainer;
let gameBoardArray=createArray(gameBoardSizeX+1,gameBoardSizeY+1);
let playerBoardArray;
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

    PlayerGameBoard.style.width=(gameBoardSizeX+1)*gameScale+"px";
    PlayerGameBoard.style.height=(gameBoardSizeY+1)*gameScale+"px";
    PlayerGameBoard.style.fontSize=gameScale/2+"px";

    rect = PlayerGameBoard.getBoundingClientRect();
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
    PlayerGameBoard=document.createElement("div");   // Create a <button> element;
    PlayerGameBoard.id = "PlayerGameBoard";
    GameBoardContainer=document.getElementById("GameBoardContainer");
    GameBoardContainer.appendChild(PlayerGameBoard);

    rect = PlayerGameBoard.getBoundingClientRect();
    gbLeft = rect.left + window.scrollX;
    gbTop = rect.top + window.scrollY;
    PlayerGameBoard.style.width=(gameBoardSizeY+1)*gameScale+"px";
    PlayerGameBoard.style.height=(gameBoardSizeX+1)*gameScale+"px";


    PlayerGameBoard.addEventListener('mousedown', function(event){dragStart(event)}, false);
    PlayerGameBoard.addEventListener('mouseup', function(event){dragEnd(event)}, false);
    PlayerGameBoard.addEventListener('mousemove', function(event){drag(event)}, false);

    PlayerGameBoard.addEventListener('touchstart', function(event){dragStart(event)}, false);
    PlayerGameBoard.addEventListener('touchend', function(event){dragEnd(event)}, false);
    PlayerGameBoard.addEventListener('touchmove', function(event){drag(event)}, false);
    document.onkeydown = function (e) {
        e = e || window.event;
        if(Ship.dragItem) {
            if (e.key === "Shift") {
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
            PlayerGameBoard.appendChild(gridBox);
        }
    }
}

class Ship {
    constructor(type) {
        this.id = Ship.incrementId();
        this.length;
        this.type=type;
        this.direction = true;
        this.lastDirection=this.direction;
        this.lastLocation=null;
        this.hueShift=0;
        this.rotated=false;
        this.liveBlocks=[];
        this.rotateKey = false;

        // Auto run on create
        this.element=document.createElement("img");   // Create a <button> element;
        this.element.id = "Ship" + this.id;
        this.element.className = "GamePiece_Ship";
        this.element.textContent = this.id;
        this.addEventListeners();
        this.orient();
        Ship.playerShips.push(this);
        PlayerGameBoard.appendChild(this.element);

        switch(this.type.toLowerCase()){
            case "carrier":
                this.length=5;
                break;
            case "battleship":
                this.length=4;
                break;
            case "submarine":
                this.length=3;
                break;
            case "cruiser":
                this.length=3;
                break;
            case "destroyer":
                this.length=2;
                break;
        }
    }
    addEventListeners(){
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
            }else{
                me.move(me.lastLocation,me.lastDirection);
            }
            me.element.style.visibility="visible";
        }, false);
    }
    orient(e){
        let tx=initialX;
        initialX=initialY;
        initialY=tx;
        if (this.direction) {
            this.height = Number((gameScale * this.length)-2);
            this.width = Number(gameScale-2);

            this.element.src="img/image2.png";

            setTranslate(Ship.mouseX - Ship.relMouseX, Ship.mouseY - Ship.relMouseY, this.element);
        } else {
            this.width = Number((gameScale * this.length)-2);
            this.height = Number(gameScale-2);

            this.element.src="img/image.png";

            setTranslate(Ship.mouseX - Ship.relMouseY, Ship.mouseY - Ship.relMouseX, this.element);
        }
        this.element.style.height = this.height+'px';
        this.element.style.width = this.width+'px';
        this.element.style.lineHeight = this.element.style.height;
    }
    rotate(e){
        //Only rotate once per shift press
        if (!this.rotateKey) {
            this.lastDirection=this.direction;
            this.direction = !this.direction;
            this.rotateKey=true;
            this.rotated=!this.rotated;
            this.orient(e);
        }
    }
    move(locationID, dir) {
        if (dir !== undefined){this.direction = dir;}
        if (locationID === undefined){locationID = this.lastLocation}
        this.lastLocation = locationID;
        this.lastDirection=this.direction;

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
    color(colorName,hue=0){
        this.element = Pixastic.process(this.element, "hsl", {hue:-this.hueShift,saturation:-20,lightness:0});
        if (colorName !==undefined) {
            switch (colorName) {
                case 1:
                case "purple":
                    this.hueShift = 70;
                    break;
                case 2:
                case "pink":
                    this.hueShift = 100;
                    break;
                case 3:
                case "red":
                    this.hueShift = 150;
                    break;
                case 4:
                case "orange":
                    this.hueShift = 180;
                    break;
                case 5:
                case "yellow":
                    this.hueShift = 210;
                    break;
                case 6:
                case "green":
                    this.hueShift = 260;
                    break;
                case 7:
                case "teal":
                    this.hueShift = 320;
                    break;
                case 8:
                case "lightblue":
                    this.hueShift = 340;
                    break;
                case 0:
                default:
                    this.hueShift = 0;
                    break;
            }
        }else if(hue !== 0){
            this.hueShift=hue;
        }

        this.element = Pixastic.process(this.element, "hsl", {hue:this.hueShift,saturation:20,lightness:0});
        this.addEventListeners();
    }

    hit(location){
        this.liveBlocks.splice(this.liveBlocks.indexOf(location), 1);
        if (this.liveBlocks.length===0){
            Ship.playerShips[this.id].element.style.backgroundColor="red";
            Ship.playerShips.splice(Ship.playerShips.indexOf(this), 1);
            return "You sunk my "+this.type+"!";
        }else{
            return "Hit!";
        }
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

    static finalizeLocations(){
        Ship.playerShips.forEach(function(ship) {

            let headY = ship.lastLocation.split("")[0].toUpperCase().charCodeAt(0)-64;
            let headX = ship.lastLocation.split("")[1];
            for (let i = 0; i < ship.length; i++) {
                if (ship.direction) {
                    playerBoardArray[headY + i][headX] = ship.id;
                    ship.liveBlocks.push("" + String.fromCharCode(headY + i + 64) + headX);
                } else {
                    playerBoardArray[headY][headX + i] = ship.id;
                    ship.liveBlocks.push("" + String.fromCharCode(headY + 64) + (headX + i));
                }
            }
        });
    }
    static generatePlayer() {
        let requestedShips = [
            "destroyer",
            "submarine",
            "cruiser",
            "battleship",
            "carrier"
        ];
        playerBoardArray=createArray(gameBoardSizeX+1,gameBoardSizeY+1);
        for(let x=0;x<requestedShips.length;x++){
            let type = requestedShips[x];
            new Ship(type);
            (Ship.playerShips[x]).move("A"+(x+1),true);

        }
        return;
    }
    static fire(location){
        let fireY = location.split("")[0].toUpperCase().charCodeAt(0)-64;
        let fireX = location.split("")[1];
        if(enemyBoardArray[fireY][fireX]!==undefined){
            console.log(EnemyShip.enemyShips[enemyBoardArray[fireY][fireX]].hit(location));
            return true;
        }else{
            console.log("Miss!");
        }
    }
}


initializeGameBoard();


Ship.generatePlayer();

resizeEverything();

// })();



