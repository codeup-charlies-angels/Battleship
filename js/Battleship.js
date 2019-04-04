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
class Ship {
    constructor(length) {
        this.id = Ship.incrementId();
        this.length = length;
        this.direction = true;

        // Auto run on create
        var ship = document.createElement("div");   // Create a <button> element
        ship.id = "Ship" + this.id;
        ship.className = "GamePiece_Ship";
        ship.textContent = this.id;
        Ship.playerShips.push(ship);
        document.body.appendChild(ship);

    }
    move(locationID, dir) {
        this.direction = dir;
        var loc = getOffset(locationID);
        console.log("Moving Ship" + this.id + " to " + locationID + " (" + loc.left + ", " + loc.top + ")");
        var ship = document.getElementById("Ship" + this.id);
        ship.style.position = "absolute";
        ship.style.top = (loc.top + 1) + 'px';
        ship.style.left = (loc.left + 1) + 'px';
        if (dir) {
            ship.style.height = ((50 * this.length)-2) + 'px';
            ship.style.width = 48 + 'px';
        } else {
            ship.style.height = 48 + 'px';
            ship.style.width = ((50 * this.length)-2) + 'px';
        }
        ship.style.lineHeight = ship.style.height;
    }
    static playerShips = []
    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++;
        return this.latestId;
    }
}
// })();



