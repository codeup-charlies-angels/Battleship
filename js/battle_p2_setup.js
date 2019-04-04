// set up board for p2 ships.

/*
ship type/ size / number per player
battleship / 4    1
cruiser /    3    2
destroyer /  2    3
submarine /  1    4

*/


var boardArray = [];
var p2Ships = ["battleship", "cruiser","cruiser", "destroyer","destroyer","destroyer",]; // may not be needed
var p2BattleShip = [4,1];   // size, how many times it can be placed.
var p2Cruiser = [3,2];      // size, how many times it can be placed.
var p2Destroyer = [2,3];    // size, how many times it can be placed.
var p2sub = [1,4];          // size, how many times it can be placed.
var random2 = (function () {return Math.floor(Math.random() * 2)}); //randomizer for vertical or horizontal placement
var random10 = (function () {return Math.floor((Math.random()*10)+1)});
var shipHead;
// fuction to create board array.

    var rows = ['a', 'b','c','d','e','f','g','i','j'];



    function arrayBuilder(item, index, array) {
        for (var i = 1; i < 11; i++) {
            var x = (item + i);
            x= x.toString();
            x=x.toUpperCase();
            // console.log(x); //debug
            boardArray.push(x);
        }
    }
        // creates an array with all the coordinate combinations for game grid.
        rows.forEach(arrayBuilder);
    // find row
    function findRow() {
        //change random int to a corresponding letter
        switch(random10()){
            case 1:
                return "A";
                break;
            case 2:
                return "B";
                break;
            case 3:
                return "C";
                break;
            case 4:
                return "D";
                break;
            case 5:
                return "E";
                break;
            case 6:
                return "F";
                break;
            case 7:
                return "G";
                break;
            case 8:
                return "H";
                break;
            case 9:
                return "I";
                break;
            case 10:
                return "J";
                break;
            default:
                return "A";
        }
    }


    // find random coordinates for the head of the ship
    function randoCoordinate() {
        var y = findRow(); //random alpha A-J
        var x = random10();// random int 1-10
        shipHead = y+x;
        return shipHead;
    }


