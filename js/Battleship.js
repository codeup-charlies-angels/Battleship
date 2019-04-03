"use strict"

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
        this.move = function (locationID, dir) {
            var loc = getOffset(locationID);
            console.log("Moving Ship" + this.id + " to " + locationID + " (" + loc.left + ", " + loc.top+")");
            var ship = document.getElementById("Ship" + this.id);
            ship.style.position = "absolute";
            ship.style.top = loc.top + 'px';
            ship.style.left = loc.left + 'px';
            if (dir) {
                ship.style.height = (50 * this.length) + 'px';
                ship.style.width = 50 + 'px';
            } else {
                ship.style.height = 50 + 'px';
                ship.style.width = (50 * this.length) + 'px';
            }
            ship.style.lineHeight=ship.style.height;
        }
        // Auto run on create
        var ship = document.createElement("div");   // Create a <button> element
        ship.id = "Ship" + this.id;
        ship.className="GamePiece";
        ship.textContent=this.id;
        document.body.appendChild(ship);

    }
    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++;
        return this.latestId;
    }
}



