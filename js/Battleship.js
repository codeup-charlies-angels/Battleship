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
    constructor(id, length, direction) {
        this.id = id;
        this.length = length;
        this.direction = direction;
        this.place = function (locationID, dir) {
            var loc = getOffset(locationID)
            console.log("Moving " + this.id + " to " + locationID + " " + loc);
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
        }
        this.create = function () {
            var ship = document.createElement("div");   // Create a <button> element
            ship.id = "Ship" + this.id;
            ship.className="GamePiece"
            document.body.appendChild(ship);
        }
    }
}



