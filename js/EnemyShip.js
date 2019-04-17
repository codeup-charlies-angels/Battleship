
let enemyBoardArray;

let randomN = (function (n) {
    return Math.floor((Math.random() * n) + 1)
});

class EnemyShip {
    constructor(type) {
        this.id = EnemyShip.incrementId();
        this.length=0;
        this.type=type;
        this.spotChosen=false;
        this.direction = true;
        this.liveBlocks=[];
        this.attemptCounter=0;
        this.generateLocation();
        EnemyShip.enemyShips.push(this);
    }
    generateLocation(){
        this.spotChosen=false;
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
        let randX,randY,randDir;
        let tempEnemyBoardArray;
        do {
            this.attemptCounter++;
            if (this.attemptCounter>10){
                EnemyShip.genFailed=true;
                return false;
            }
            console.log("Attempt"+this.id);
            tempEnemyBoardArray=enemyBoardArray;
            this.liveBlocks=[];
            randDir = Boolean(Math.round(Math.random()));
            if (randDir){
                randY = randomN(10-this.length+1);
                randX = randomN(10);
            }else{
                randY = randomN(10);
                randX = randomN(10-this.length+1);
            }
            let freeSpot=true;
            console.log(typeof tempEnemyBoardArray[randX][randY]);
            for(let i=0;i<this.length;i++){
                if(randDir){
                    if(tempEnemyBoardArray[randY+i][randX] !== undefined){
                        console.log(randY+","+randX+" is not empty!");
                        freeSpot=false;
                        break;
                    }
                    tempEnemyBoardArray[randY+i][randX]=this.id;
                    this.liveBlocks.push(""+String.fromCharCode(randY+i + 64) + randX);
                }else{
                    if(tempEnemyBoardArray[randY][randX+i] !== undefined){
                        console.log(randY+","+randX+" is not empty!");
                        freeSpot=false;
                        break;
                    }
                    tempEnemyBoardArray[randY][randX+i]=this.id;
                    this.liveBlocks.push(""+String.fromCharCode(randY + 64) + (randX+i));
                }
            }
            if (freeSpot) {
                this.spotChosen = true;
                this.direction=randDir;
            }
        }while(this.spotChosen===false);
        enemyBoardArray=tempEnemyBoardArray;
        return true;
    }
    hit(location){
        this.liveBlocks.splice(this.liveBlocks.indexOf(location), 1);
        if (this.liveBlocks.length===0){
            EnemyShip.enemyShips.splice(EnemyShip.enemyShips.indexOf(this), 1);
            Ship.playerShips[this.id].element.style.backgroundColor="red";
            return "You sunk my "+this.type+"!";
        }else{
            return "Hit!";
        }
    }

    //Class variable to track all ships
    static enemyShips = [];
    static genFailed=false;
    static successfulGen=false;

    static generateEnemies() {
        EnemyShip.enemyShips = [];
        EnemyShip.genFailed=false;
        let requestedShips = [
            "carrier",
            "battleship",
            "cruiser",
            "destroyer",
            "submarine"
        ];
        enemyBoardArray=createArray(gameBoardSizeX+1,gameBoardSizeY+1);
        let success = true;
        for(let x=0;x<requestedShips.length;x++){
            let type = requestedShips[x];
            if (!EnemyShip.genFailed) {
                console.log("Generating new "+type);
                new EnemyShip(type);
            }else{
                success=false;
                break;
            }
        }
        EnemyShip.successfulGen =success;
        return success;

    }

    //Auto generate an ID for the ship
    static incrementId() {
        if (this.latestId == null) this.latestId = 0;
        else this.latestId++;
        return this.latestId;
    }
}
let count=0;
do{
    count++;
    if(count>100)break;
    EnemyShip.generateEnemies();
}while(!EnemyShip.successfulGen);
//
// EnemyShip.enemyShips.forEach(function(ship){
//     new Ship(ship.length);
//     Ship.playerShips[ship.id].move(ship.liveBlocks[0],ship.direction);
// });