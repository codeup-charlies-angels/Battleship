// JavaScript Model
var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] }
    ],

    fire: function(guess) {

        for(var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);

            // check if a ship location has already been hit
            if ( ship.hits[index] === "hit" ) {
                view.displayMessage("Oops, you already hit that location");
                return true;
            } else if ( index >= 0 ) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");

                if ( this.isSunk(ship) ) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
            $('#guessInput').focus();
        }
        view.displayMiss(guess);
        view.displayMessage("You Missed");
        return false;
    },

    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        $('#guessInput').focus();
        return true;
    },

    generateShipLocations: function() {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },

    generateShip: function() {
        var direction = Math.floor(Math.random() * 2);
        var row, col;

        if (direction === 1) { // horizontal
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        } else { // vertical
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];

        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: function(locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
};

var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

var controller = {
    guesses: 0,

    processGuess: function(guess) {
        var location = parseGuess(guess);

        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
};

// helper function to parse a guess from the user
function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
    }
    return null;
}

// event handlers
function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value.toUpperCase();
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    // in IE9 and earlier, the event object doesn't get passed
    // to the event handler correctly, so we use window.event instead.
    e = e || window.event;
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

// init - called when the page has completed loading
window.onload = init;

function init() {
    // Fire! button onclick handler
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    // handle "return" key press
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    // place the ships on the game board
    model.generateShipLocations();
}



// ---------------------
    // Start the game setup
    $(document).ready(function() {
        $(".one").on("click", function() {
            $(".text").text(output.player1);
            gameSetup(this);
        });
        $(".multi").on("click", function(e) {
            e.preventDefault();
            if (!$("div").hasClass("error")) {
                $(".text").text(output.not);
                $(this).addClass("error");
            }
        });
        $(".options").on("click", function(e) {
            e.preventDefault();
            if (!$("div").hasClass("error")) {
                $(".text").text(output.not);
                $(this).addClass("error");
            }
        });
    });

function gameSetup(t) {
    $(t).off() && $(".two").off();
    $(".one").addClass("self").removeClass("one").text("Place My Own");
    $(".multi").addClass("random").removeClass("multi").text("Random");

    $(".self").off("click").on("click", function() {
        $(".text").text(output.self);
        selfSetup(playerFleet);
    });
    $(".random").off("click").on("click", function() {
        playerFleet = new Fleet("Player 1");
        playerFleet.initShips();
        randomSetup(playerFleet);
    });
}


function selfSetup() {
    $(".self").addClass("horz").removeClass("self").text("Horizontal");
    $(".random").addClass("vert").removeClass("random").text("Vertical");

    // initialize the fleet
    playerFleet = new Fleet("Player 1");
    playerFleet.initShips();
    // light up the players ship board for placement
    placeShip(playerFleet.ships[playerFleet.currentShip], playerFleet);
}

function randomSetup(fleet) {
    // Decide if the ship will be placed vertically or horizontally
    // if 0 then ship will be places horizontally if 1 vertically
    // setShip(location, ship, "vert", fleet, "self");
    if (fleet.currentShip >= fleet.numOfShips) return; // regard against undefined length

    var orien = Math.floor((Math.random() * 10) + 1);
    var length = fleet.ships[fleet.currentShip].length;

    if (orien < 6) {
        // create a random number betwee 1 and 6
        var shipOffset = 11 - fleet.ships[fleet.currentShip].length;
        var horiz = Math.floor((Math.random() * shipOffset) + 1);
        var vert = Math.floor(Math.random() * 9);
        var randNum = parseInt(String(vert) + String(horiz));
        if (fleet == cpuFleet) checkOverlap(randNum, length, "horz", fleet);
        else setShip(randNum, fleet.ships[fleet.currentShip], "horz", fleet, "random");
    } else {
        var shipOffset = 110 - (fleet.ships[fleet.currentShip].length * 10);
        var randNum = Math.floor((Math.random() * shipOffset) + 1);

        if (fleet == cpuFleet) checkOverlap(randNum, length, "vert", fleet);
        else setShip(randNum, fleet.ships[fleet.currentShip], "vert", fleet, "random");
    }
}

function createCpuFleet() {
    // create a random ship placement for the cpu's fleet
    cpuFleet = new Fleet("CPU");
    cpuFleet.initShips();
    randomSetup(cpuFleet);
}


function placeShip(ship, fleet) {
    // check orientation of ship and highlight accordingly
    var orientation = "horz";
    $(".vert").off("click").on("click", function() {
        orientation = "vert";
    });
    $(".horz").off("click").on("click", function() {
        orientation = "horz";
    });
    // when the user enters the grid have the ships lenght highlighted with the
    // ships length.
    $(".bottom").find(".points").off("mouseenter").on("mouseenter", function() {
        var num = $(this).attr('class').slice(15);
        //
        if (orientation == "horz") displayShipHorz(parseInt(num), ship, this, fleet);
        else displayShipVert(parseInt(num), ship, this, fleet);
    });
}


function displayShipHorz(location, ship, point, fleet) {
    var endPoint = location + ship.length - 2;
    if (!(endPoint % 10 >= 0 && endPoint % 10 < ship.length - 1)) {
        for (var i = location; i < (location + ship.length); i++) {
            $(".bottom ." + i).addClass("highlight");
        }
        $(point).off("click").on("click", function() {
            setShip(location, ship, "horz", fleet, "self");
        });
    }
    $(point).off("mouseleave").on("mouseleave", function() {
        removeShipHorz(location, ship.length);
    });
}

function displayShipVert(location, ship, point, fleet) {
    var endPoint = (ship.length * 10) - 10;
    var inc = 0;
    if (location + endPoint <= 100) {
        for (var i = location; i < (location + ship.length); i++) {
            $(".bottom ." + (location + inc)).addClass("highlight");
            inc = inc + 10;
        }
        $(point).off("click").on("click", function() {
            setShip(location, ship, "vert", fleet, "self");
        });
    }
    $(point).off("mouseleave").on("mouseleave", function() {
        removeShipVert(location, ship.length);
    });
}

function removeShipHorz(location, length) {
    for (var i = location; i < location + length; i++) {
        $(".bottom ." + i).removeClass("highlight");
    }
}

function removeShipVert(location, length) {
    var inc = 0;
    for (var i = location; i < location + length; i++) {
        $(".bottom ." + (location + inc)).removeClass("highlight");
        inc = inc + 10;
    }
}

function setShip(location, ship, orientation, genericFleet, type) {
    if (!(checkOverlap(location, ship.length, orientation, genericFleet))) {
        if (orientation == "horz") {
            genericFleet.ships[genericFleet.currentShip].populateHorzHits(location);
            $(".text").text(output.placed(genericFleet.ships[genericFleet.currentShip].name + " has"));
            for (var i = location; i < (location + ship.length); i++) {
                $(".bottom ." + i).addClass(genericFleet.ships[genericFleet.currentShip].name);
                $(".bottom ." + i).children().removeClass("hole");
            }
            if (++genericFleet.currentShip == genericFleet.numOfShips) {
                $(".text").text(output.placed("ships have"));
                $(".bottom").find(".points").off("mouseenter");
                // clear the call stack
                setTimeout(createCpuFleet, 100);
            } else {
                if (type == "random") randomSetup(genericFleet);
                else placeShip(genericFleet.ships[genericFleet.currentShip], genericFleet);
            }

        } else {
            var inc = 0;
            genericFleet.ships[genericFleet.currentShip].populateVertHits(location);
            $(".text").text(output.placed(genericFleet.ships[genericFleet.currentShip].name + " has"));
            for (var i = location; i < (location + ship.length); i++) {
                $(".bottom ." + (location + inc)).addClass(genericFleet.ships[genericFleet.currentShip].name);
                $(".bottom ." + (location + inc)).children().removeClass("hole");
                inc = inc + 10;
            }
            if (++genericFleet.currentShip == genericFleet.numOfShips) {
                $(".text").text(output.placed("ships have"));
                $(".bottom").find(".points").off("mouseenter");
                // clear the call stack
                setTimeout(createCpuFleet, 100);
            } else {
                if (type == "random") randomSetup(genericFleet);
                else placeShip(genericFleet.ships[genericFleet.currentShip], genericFleet);
            }
        }
    } else {
        if (type == "random") randomSetup(genericFleet);
        else $(".text").text(output.overlap);
    }
} // end of setShip()

function checkOverlap(location, length, orientation, genFleet) {
    var loc = location;
    if (orientation == "horz") {
        var end = location + length;
        for (; location < end; location++) {
            for (var i = 0; i < genFleet.currentShip; i++) {
                if (genFleet.ships[i].checkLocation(location)) {
                    if (genFleet == cpuFleet) randomSetup(genFleet);
                    else return true;
                }
            } // end of for loop
        } // end of for loop
    } else {
        var end = location + (10 * length);
        for (; location < end; location += 10) {
            for (var i = 0; i < genFleet.currentShip; i++) {
                if (genFleet.ships[i].checkLocation(location)) {
                    if (genFleet == cpuFleet) randomSetup(genFleet);
                    else return true;
                }
            }
        }
    } // end of if/else
    if (genFleet == cpuFleet && genFleet.currentShip < genFleet.numOfShips) {
        if (orientation == "horz") genFleet.ships[genFleet.currentShip++].populateHorzHits(loc);
        else genFleet.ships[genFleet.currentShip++].populateVertHits(loc);
        if (genFleet.currentShip == genFleet.numOfShips) {
            // clear the call stack
            setTimeout(startGame, 500);
        } else randomSetup(genFleet);
    }
    return false;
} // end of checkOverlap()
