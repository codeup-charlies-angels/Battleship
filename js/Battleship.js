// (function() {
"use strict";

//
//
// Define Globals
//
//




//
//
// Useful functions
//
//

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev,id) {
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("shipID", id);
    // Get the location of the mouse within the battleship element.
    // We will use this to offset the location of the battleship so you can grab it anywhere to drag it
    let rect = ev.target.getBoundingClientRect();
    let x = ev.clientX - rect.left; //x position within the element.
    let y = ev.clientY - rect.top;
    let j = JSON.stringify([x,y]); // Convert to json string so it can be passed
    ev.dataTransfer.setData("offset", j);

}

function drop(ev) {
    ev.preventDefault();
    let obj = ev.dataTransfer.getData("shipID");
    let offset = JSON.parse(ev.dataTransfer.getData("offset")); // Convert the offset back from JSON
    Ship.playerShips[obj].move(ev.target.id,true,offset);
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


        // Auto run on create
        this.element=document.createElement("div");   // Create a <button> element;

        this.element.id = "Ship" + this.id;
        this.element.className = "GamePiece_Ship";
        this.element.textContent = this.id;
        this.element.draggable=true;
        let myID = this.id;
        this.element.addEventListener('dragstart', function(event){drag(event, myID)}, false);
        Ship.playerShips.push(this);
        document.body.appendChild(this.element);

    }
    move(locationID, dir,offset) {
        if (offset === undefined){offset=[0,0]} // Set offset to 0,0 if not passed in.
        this.direction = dir;
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
            this.element.style.top = "50%";
            this.element.style.left = "-"+(this.element.style.width);
            this.element.style.transition ="all 1s ease";
        }

        //Convert the offset to 50px intervals
        console.log("Before conversion offset: " + offset);
        offset[0]=Math.floor(offset[0]/50)*50;
        offset[1]=Math.floor(offset[1]/50)*50;
        console.log("After conversion offset: " + offset);

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



