// set up board for p2 ships.

var boardArray = [];
var p2Ships;

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

        rows.forEach(arrayBuilder);



