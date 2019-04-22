function handleGameOver(){
    let gbCont = document.getElementById("PlayerGameBoard");
    if (gameWon){
        gbCont.innerHTML="<h1>YOU WIN!</h1>";
        gbCont.style.backgroundColor="lightblue";
    }else{
        gbCont.innerHTML="<h1>YOU LOSE!</h1>";
    }
}