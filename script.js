/*global variables*/

/*Initializes the player and enemy*/
function initialize(){
    let plLvl = 1; 

    let plHealthMax = 16;
    let plHealthCur = plHealthMax;
    let plManaMax = 5;
    let plManaCur = plManaMax;

    let plName= '';

    document.getElementById("healthData").innerHTML= plHealthCur + "/" + plHealthMax;
    document.getElementById("manaData").innerHTML=  plManaCur + "/" + plManaMax;


    generateEnemy();
    turnOrder();
}

/*determines which Enemy is shown and what stats it has*/
function generateEnemy(){
    let enLvl = Math.ceil(Math.random()*5);
    let enNum = Math.ceil(Math.random()*2);
    let enName= '';


    /*MAKE THIS A LIST INSTEAD!*/
    if (enLvl <= 5){
        if(enNum == 1){
            enName = "Slime";
            document.getElementById("EnemySprite").src="slime blue.png";
        }

        else{
            enName = "Skeleton";
            document.getElementById("EnemySprite").src="Skeleton.png";
        }

    }

    document.getElementById("EnemyName").innerHTML =  enName + " lvl: " + enLvl;
    
}

/*Toggles the Turn*/
function turnOrder(){
    document.getElementById("turnOrder").innerHTML= ""
}

function BeginTurn(){

}