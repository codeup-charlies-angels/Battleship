// (function() {
"use strict"

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
    console.log(ev.target.id);
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("shipID", id);
}

function drop(ev) {
    ev.preventDefault();
    var obj = ev.dataTransfer.getData("shipID");
    console.log(ev.target.id);
    console.log(obj);
    Ship.playerShips[obj].move(ev.target.id,true);
}

function getOffset(el) {
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
        var myID = this.id;
        this.element.addEventListener('dragstart', function(event){drag(event, myID)}, false);
        Ship.playerShips.push(this);
        document.body.appendChild(this.element);

    }
    move(locationID, dir) {
        this.direction = dir;
        if (this.direction) {
            this.element.style.height = ((50 * this.length)-2) + 'px';
            this.element.style.width = 48 + 'px';
        } else {
            this.element.style.height = 48 + 'px';
            this.element.style.width = ((50 * this.length)-2) + 'px';
        }
        if (this.moved){
            this.element.style.transition ="all 0.1s ease";
        }else{
            this.element.style.top = "50%";
            console.log("-"+(this.element.style.width));
            this.element.style.left = "-"+(this.element.style.width);
            this.element.style.transition ="all 1s ease";
        }
        var loc = getOffset(locationID);
        this.element.style.position = "absolute";
        this.element.style.top = (loc.top + 1) + 'px';
        this.element.style.left = (loc.left + 1) + 'px';
        this.element.style.lineHeight = this.element.style.height;
    }
    static playerShips = [];
    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++;
        return this.latestId;
    }
}

for(let i=0;i<5;i++){
    new Ship(i+1);
    (Ship.playerShips[i]).move("A"+(i+1),true);
}



// })();



