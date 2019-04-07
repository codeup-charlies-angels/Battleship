// set up board for p2 ships.

/*
ship type/ size / number per player
battleship / 4    1
cruiser /    3    2
destroyer /  2    3
submarine /  1    4

*/

// global variables. May change to local if not needed globally
var boardArray = [];
var p2Ships = ["battleship", "cruiser","cruiser", "destroyer","destroyer","destroyer","submarine","submarine","submarine","submarine"]; // may not be needed
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

    // changes num to alpha
    function rowNumToAlpha(y) {
    //change random int to a corresponding letter
    switch(y){
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

    // changes row alpha to numeric equivalent. lol is this redundant? I don't know how else I would do this.

    function rowAlphaToNum(y) {
    //change alpha to a corresponding number
        switch(y){
            case "A":
                return 1;
                break;
            case "B":
                return 2;
                break;
            case "C":
                return 3;
                break;
            case "D":
                return 4;
                break;
            case "E":
                return 5;
                break;
            case "F":
                return 6;
                break;
            case "G":
                return 7;
                break;
            case "H":
                return 8;
                break;
            case "I":
                return 9;
                break;
            case "J":
                return 10;
                break;
            default:
                return 1;
    }
}


    // find random coordinates for the head of the ship
    function randoCoordinate() {
        var y = findRow(); //random alpha A-J
        var x = random10();// random int 1-10
        shipHead = y+x;
        return shipHead;
    }

    // ship selector
    function shipSelector(item) {
        switch (item) {
            case "battleship":
                //console.log(p2BattleShip);
                return p2BattleShip;
                break;
            case "cruiser":
                //console.log(p2Cruiser);
                return p2Cruiser;
                break;
            case "destroyer":
               // console.log(p2Destroyer);
                return p2Destroyer;
                break;
            case "submarine":
               // console.log(p2sub);
                return p2sub;
                break;
            default:
                console.error("Error at shipSelector" + item);
                break;
        }
    }

    // below for testing purposes.
    // for (var i = 0; i < p2Ships.length; i++){
    //     console.log(p2Ships[i]);
    //     console.log(shipSelector(p2Ships[i]));
    // }

    // find grids for ship to be placed horizontally.
    function placeHorz(blx) {
        var head = randoCoordinate();               // locate the head of the ship
        console.log(head);
        var y = (head.charAt(0));   // stores the y coordinate (alpha)
        console.log(y);
        var x = +(head.charAt(1) + head.charAt(2));        // stores the x coordiante (numeric)
        console.log(x);
        var coordArr = [];

        if ((x+blx)>10){               // if ship size + x value > 10, subtract size from x value.
            console.log("valye of ex befor operation: " + (x+blx));        // debug data, comment out when not needed.
            x = 10 - blx;
            console.log("Value of x after operation: " + x);             // debug data, comment out when not needed.
        }
        for(var i = 0; i < blx ; i++){              // check to make sure all the necessery coordinates are present in board array
            x++;
            console.log(y+x);
            coordArr.push(y+x);                     // adding new coordinate to coord array to check against main coordinates array
        }
    }

    // place ships on the grid and occupy the space. Remove grid points so as not to overlap ships
    function placeShips() {
        for (var i = 0; i < p2Ships.length; i++){
            // todo: fill this stuff in. lol

        }
    }

