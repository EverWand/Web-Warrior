function generateEnemy(){
    let enLvl = Math.ceil(Math.random()*5);
    let enNum = Math.ceil(Math.random()*2);
    let enName= '';

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