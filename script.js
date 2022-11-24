/*===========================GLOBAL VARIABLES=============================*/

/*---------Booleans for toggles-------------*/
/*Boolean to toggle the Background Music*/
let muzOn = true;
/*Boolean to toggle the SFXs*/
let sfxOn= true;
/*Boolean to toggle light/dark mode*/
let dkmdOn= false;

/*Value used to state who's turn it is [ 1 = player's | 2 = Enemy's]*/
let turn = Math.ceil(Math.random()*2);

/*Audio Variable used to Call different Background Music*/
let bgMusic = new Audio('Title Theme.wav');
/*sets the background music Variable to loop*/
bgMusic.loop = true;

/*------------------Enemy--------------------*/
/* valriable used to declare the Enemy's Level [randmizes between 1 and 5]*/
let enLvl = Math.ceil(Math.random()*5);
/*variable that shuffles what the enemy is*/
let enNum = Math.ceil(Math.random()*2);
/*String used to give the enemy a name*/
let enName= '';
/*variable used for the enemy health*/
let enHealth = 0;
/*variable used for the maximum damage an enemy has*/
let enDamMax = 0;
/* variable used for the amount of EXP an enemy gives*/
let enEXP = 0;
/* variable useed for the amount of Gold an enemy gives*/
let enGold = 0;

let enDef = 0;
let enDefMax = enDef;

/*---------------Player------------------*/
/* variable used to set the player's level*/
let plLvl = 1;
/*variable used sets the amount of EXP the player has*/
let plEXP = 0;
/*variable used to set the initial amount of EXp is needed for a level up*/
let initEXPUntil = 10;
/*varaible used to keep track of how much more EXP is needed for a level*/
let curEXPUntil  = initEXPUntil;

/*variable used to keep track of the gold the player has*/
let plGold = 0;
/*varaible used to set the maximum health the player has*/
let plHealthMax = 15;
/*variable used to give a current health tracker for the player*/
let plHealthCur = plHealthMax;
/*Variable used to set the player's maximum Mana*/
let plManaMax = 5;
/*Variable used to keep track of the Player's mana*/
let plManaCur = plManaMax;
/*Variable used to set the player's Strength*/
let plStr = 5;
/*Variable used to set the player's Maximum Damage*/
let plDamMax = plStr;
let plDef = 1;
let plDefMax = plDef;
/*String to give the Player a Name*/
let plName= '';
/*Variable used to keep track if the player can Act in battle*/
let plAct = false;

let plWepCur = "None"

let plarmCur = "None"

/*------------------Shop--------------------*/
/*Variable used to keep track of how much stuff is priced in the store*/
let cost = 0;
/*Variable used to keep track how much it is to rest*/
let restCost = 2;
let wepStr = 0;
let armDef = 0;
let itemType = '';
/*=====================COMMANDS====================================*/
/*Function meant to be ran if Music is meant to be played*/
function playBGMusic(){
    /*Tests if Music is toggled on*/
    if (muzOn == true){
        /*sets the background music variable to autoplay*/
        bgMusic.autoplay = true;
        /*lower the music's volume by 50%*/
        bgMusic.volume= 0.5;
        /*play the Background Music*/
        bgMusic.play();
    }
}

function Start(){
    /*Apply the Title Theme to the Background music*/
    bgMusic.src="Title Theme.wav";
    /*Go to the Background play Function*/
    playBGMusic();
    /*Disable the Death Screen*/
    document.getElementById("DeathScreen").style.display = "none";
    /*Disable the Lower Window*/
    document.getElementById("lowerWindow").style.display = "none";
    /*Enable the Title Screen */
    document.getElementById("TitleScreen").style.display = "block";
    /*Change the sub-title Text*/
    document.getElementById("subTitle").innerHTML = "Let The Adventure Begin!";
}

/*Sets the Variables and displays needed to begin the Game back to their Initial settings  [Resets the progress when game is restarted]*/
function initialize(){
/*-------------------------SET PLAYER NAME-----------------------*/
    /*sets the Name of the player to the string typed in the text box inside the Title Screen*/
    plName = document.getElementById("playerName").value;

    
    /*Tests if the text box inside the Title Screen is empty*/
    if( plName.length == 0){
        /*if so: default the player name to 'Hero'*/
        plName = 'Hero';
    }
    
/*----------------------RESET PLAYER VARIABLES---------------------*/
    /*sets the value of the Player's Level*/
    plLvl = 1;
    /*sets the player's Experience Points*/
    plEXP = 0;
    /*sets the inital amount of Experience Needed to Level up*/
    initEXPUntil = 10;
    /*sets the amount of Experience Points Needed to the initial value*/
    curEXPUntil  = initEXPUntil;
    /*sets the player's gold amount*/
    plGold = 0
    /*Sets the Player's Maximum Health*/
    plHealthMax = 16;
    /*sets the Player's Current Health to the maximum amount*/
    plHealthCur = plHealthMax;
    /*Sets the Player's Maximum Mana*/
    plManaMax = 0;
    /*sets the Player's Current Mana to the maximum amount*/
    plManaCur = plManaMax;
    /*Sets the player's Max Damage*/
    plDamMax = plStr + wepStr; /*[should calculate the Player strength and weapon boost]*/

/*----------------------SET DISPLAY---------------------*/
    /*Enable Enemy Screen*/
    document.getElementById("EnemyScreen").style.display = "block";
    /*Enable Lower Window*/
    document.getElementById("lowerWindow").style.display = "block";
    document.getElementById("TitleScreen").style.display = "none";
    /*Change the text of the Sub-title*/
    document.getElementById("subTitle").innerHTML = "Battle!"
    /*Sets the Name input as the Player Name Display*/
    document.getElementById("NameTxt").innerHTML = plName;
    /*sets the Level Variable to the Player Level Display*/
    document.getElementById("lvlTxt").innerHTML = "Level: " + plLvl;
    /*sets the Player's EXP Variable to the Player's EXP Display*/
    document.getElementById("curEXPTxt").innerHTML = plEXP;
    /*sets the Variable for the amount of EXP Left Until a Level up to the EXP Until Level Display*/
    document.getElementById("UntilLvlTxt").innerHTML = initEXPUntil - plEXP;

    /*sets the players current and maximum health to the Health Display*/
    document.getElementById("healthData").innerHTML= plHealthCur + "/" + plHealthMax;
    /*sets the players current and maximum Mana to the Mana Display*/
    document.getElementById("manaData").innerHTML=  plManaCur + "/" + plManaMax;

/*-----------AFTER THE DISPLAY IS SET---------------*/
    /*Go to the Function that generates an enemy */
    generateEnemy();

}

/*Determines which Enemy is shown and what stats it has*/
function generateEnemy(){
/*-------------------------TEST TURN ORDER-----------------------*/ 
    /*Tests if it's the Player's turn*/
    if(turn == 1){
        /*Use the Function that Enables the Player's actions*/
        EnablePlayerAct();
    }
    /*Default to this if it's not the player's turn*/
    else{
        /*use the Function the diablesthe player's actions*/
        disablePlayerAct();
    }

/*----------------------SET DISPLAY---------------------*/
    /*Apply the Battle Theme to the Background music*/
    bgMusic.src="Battle Theme.wav";
    /*plays the Background Music*/
    
    /*Enables the Enemy Screen*/
    document.getElementById("subTitle").innerHTML= "BATTLE!"
    document.getElementById("EnemyScreen").style.display = "block";
    /*Disable the Results Screen*/
    document.getElementById("ResultScreen").style.display = "none";
    /*Disable the Shop Screen*/
    document.getElementById("ShopScreen").style.display = "none";


/*----------------------SET ENEMY VARIABLES---------------------*/
    /*-----------General Enemy Variables--------*/
    /*Set a random number between 1-5 as the Enemy's Level*/
    enLvl = Math.ceil(Math.random()*5);
    /*Roll to see which enemy the player will fight*/
    enNum = Math.ceil(Math.random()*2);
    
    /*-----------Specific Enemy Variables--------*/
        /*if the enemy Number is 1 --> [SLIME STATS]*/
        if(enNum == 1){
            /*Give the Enemy a name*/
            enName = "Slime";
            /*set the EXP for the Enemy rewards*/
            enEXP =  Math.ceil(enLvl/2);
            /*set the Gold for the Enemy rewards*/
            enGold = 1 + Math.ceil(enLvl/2);
            /*Gives the Enemy it's health*/
            enHealth = 3 + enLvl;
            /*gives the Enemy a maximum attack*/
            enDamMax = 1 + enLvl;
            /*Changes the Image of the enemy to it's proper Sprite*/
            document.getElementById("EnemySprite").src="slime blue.png";

            enDef = 0 + enLvl;
        }
        /*if the enemy Number is 1 --> [SKELETON STATS]*/
        else{
            /*Give the Enemy a name*/
            enName = "Skeleton";
            /*set the EXP for the Enemy rewards*/
            enEXP =  3 + Math.ceil(enLvl/2);
            /*set the Gold for the Enemy rewards*/
            enGold = 2 + Math.ceil(enLvl/2);
            /*Gives the Enemy it's health*/
            enHealth = 6 + enLvl;
            /*gives the Enemy a maximum attack*/
            enDamMax = 2 + enLvl;
            /*Changes the Image of the enemy to it's proper Sprite*/
            document.getElementById("EnemySprite").src="Skeleton.png";

            enDef = 2 + enLvl;
        }

/*-----------AFTER THE ENEMY IS SET---------------*/
    /*Display the Enemy Stats*/
    document.getElementById("EnemyName").innerHTML =  enName + " lvl: " + enLvl;
    /*Go to the Function that Updates the Game*/
    GameUpdate();
}

/*Disables the PLayer's Actions while in Combat*/
function disablePlayerAct(){
/*----------------------SET DISPLAY---------------------*/ 
    /*Variable that targets the player's Actions from the inside the HTML File*/
    const actBox = document.querySelectorAll('.actionTxt');

    /*Goes through each object that fits the Variable*/
    actBox.forEach(actClass => {
        /*Gives the matching objects a background color style*/
        actClass.style.backgroundColor = 'grey';
    });

/*----------------------AFTER DISPLAY IS SET---------------------*/
    /*Makes it so that the player Act Boolean is false*/
    plAct = false;

}

/*Enables the Player's Actions while in Combat*/
function EnablePlayerAct(){
/*----------------------SET DISPLAY---------------------*/ 
    /*Variable that targets the player's Actions from the inside the HTML File*/
    const actBox = document.querySelectorAll('.actionTxt');

    /*Goes through each object that fits the Variable*/
    actBox.forEach(actClass => {
        /*Gives the matching objects a background color style*/
        actClass.style.backgroundColor = 'lightBlue';
    });

/*----------------------AFTER DISPLAY IS SET---------------------*/
    /*Makes it so that the player Act Boolean is true*/
    plAct = true;
}

/*What the Enemy Does when it is their Turn*/
function EnemyTurn(){
/*----------------------SET DISPLAY---------------------*/ 
    /*if the Enemy still has health above zero*/
    if (enHealth > 0){
    /*----ENEMY MAKES AN ATTACK----*/
    /*======HIT=======*/
        let EnemyHit = (Math.ceil(Math.random()*enDamMax)); 

        let DamageCalulation = EnemyHit-plDefMax;
        
        if ((DamageCalulation) > 0 ){  
              
            plHealthCur -= DamageCalulation;
        
        /*____Audio___*/
            /*tests if the sfx are turned on*/
            if(sfxOn == true){             
        
            /*Add a new sound for the when the player is damaged*/
            let hurtWav= new Audio('Damaged.wav');
            /*sets the volume of the sound Effect*/
            hurtWav.volume = 0.3;
            /*plays the hurt SFX*/
            hurtWav.play();
            }

            document.getElementById("turnTxt").innerHTML = enName + " Dealth " + DamageCalulation + " Damage!";
            /*turn the background of the Player pool container Red [Emulates getting hit]*/
            document.getElementById("hpmp").style.backgroundColor="Red";
            StatUpdate();
            
       
        /*____Red Repair___*
            /*Delays the content inside by a Half-Second*/
            setTimeout(function() {
            /*turn the background of the Player pool container back to its default*/
            document.getElementById("hpmp").style.backgroundColor="khaki";
            }, 500);

            
            
            setTimeout(function(){
                /*Disables the Player's Actions*/
                EnablePlayerAct();
                /*Swap to the Turn Over to the Enemy*/
                turn=1;
                /*Update the Game*/
                GameUpdate();
            }, 2000)
            
            
        }

        else{
            document.getElementById("turnTxt").innerHTML = "Attack was deflected!";
            
            setTimeout(function(){
                /*Disables the Player's Actions*/
                EnablePlayerAct();
                /*Swap to the Turn Over to the Enemy*/
                turn=1;
                /*Update the Game*/
                GameUpdate();
            }, 2000)  
        }
    }
    
    /*if the Enemy doesn't have health above zero, default to this*/
    else{
        /*Go to the Battle Results [The enemy is probably slain]*/
        BattleResult();
    } 
}

/*===================SCREEN UPDATES================================*/
/*Swaps the battle window display to the Battle Results*/
function BattleResult(){
    
    /*------------------SET NEEDED VARIABLES-----------------*/ 
        /*adds the Enemy's Experience Reward to the Players EXP amount*/
        plEXP += enEXP;
        /*adds the Enemy's Gold Reward to the Players Gold amount*/
        plGold += enGold;
    /*----------------------SET DISPLAY---------------------*/ 
        /*Disables the Player's Actions*/
        disablePlayerAct();       
        /*Apply the Battle Theme to the Background music*/
        bgMusic.src="Victory.wav";
        /*disables the Enemy Screen*/
        document.getElementById("EnemyScreen").style.display = "none";
        /*Enables the Results Screen*/
        document.getElementById("ResultScreen").style.display = "block";

        
        /*Display the amount of Experience rewarded*/
        document.getElementById("expReward").innerHTML = "EXP: +" + enEXP;
        /*Display the amount of Gold rewarded*/
        document.getElementById("goldReward").innerHTML = "Gold: +" + enGold;

        document.getElementById("turnTxt").innerHTML = "You won!"

    }

/*Update the Player's Experience and Level Information*/
function lvlUpdate(){
    let strInc = 0;
    let hpInc = 0;
    let ManaInc = 0;
    let ExpInc = 0;

/*-----------------PLAYER LEVEL UP!----------------------*/
    /*Tests if the player has met the required Experience to Level up*/
    if(plEXP >= initEXPUntil){
    /*-----------LEVEL UP!------------*/ 
        /*Display The Level up information*/
        document.getElementById("lvlUpInfo").style.display="Block";
       /*increase the Player's level by 1*/ 
        plLvl ++;
        restCost+=2
    /*___LEVEL BOOSTS___*/
        /*sets a value to the player strength Increase*/
        strInc = 1;
        /*sets a value to the player max HP Increase*/
        hpInc = 2;

        
        /*sets a value to the Player Max Mana Increase*/
        
        if (plLvl == 3){
            ManaInc = 5;
        }
        if (plLvl >= 3){
            ManaInc = 1;
            restCost += 5
        }
        else{
            ManaInc = 0;
        }  
        /*sets a value to the Experience Increase*/
        ExpInc=25;

    /*___Add level boosts___*/
        
        /*Increases the Expererience requirement*/
        initEXPUntil += ExpInc;
        /*Caculates how far the player is to the next level*/
        curEXPUntil = initEXPUntil - plEXP;
        /*increases the players max Damage by 1*/
        plStr += strInc;
        /*increases the Players Max Health by 2*/
        plHealthMax += hpInc;
        /*Increases the Players max Mana by 1*/
        plManaMax += ManaInc;
    
    
    /*____Results Window Display____*/
        /*Displays the Max Health Increase*/
        document.getElementById("hpUp").innerHTML= "Max Health: +" + hpInc;
        /*Displays the Max Mana Increase*/
        document.getElementById("manaUp").innerHTML= "Max Mana: +" + ManaInc;
        /*Displays the Strength Increase*/
        document.getElementById("strUp").innerHTML = "Strength: +" + strInc;
        
    }

    else{
        document.getElementById("lvlUpInfo").style.display="none";
    }

/*----------------------SET DISPLAY---------------------*/ 
/*____Stat Side Window___*/ 
    /*Displays the Player's level*/
    document.getElementById("lvlTxt").innerHTML = "Level: " + plLvl;
    /*Displays the PLayer's Current EXP*/
    document.getElementById("curEXPTxt").innerHTML = plEXP;
    /*Displays the EXP Left until level Up*/
    document.getElementById("UntilLvlTxt").innerHTML = initEXPUntil - plEXP;

}

/*Updates the player's Gold Information*/
function GoldUpdate(){
/*------------------SET DISPLAY---------------------*/ 
    /*Displays the Player's Gold*/
    document.getElementById("curGoldTxt").innerHTML = "Gold: " + plGold;
}

/*Updates the Turn*/
function TurnUpdate(){
    /*If it's the player's Turn*/
    if(turn == 1){
        /*Display that it's the player's Turn*/
        document.getElementById("turnTxt").innerHTML =  plName +"'s Turn: " ;
    }
    /*When it's the Enemy's Turn*/
    else{
        /*Display that it's the Enemy's Turn*/
        document.getElementById("turnTxt").innerHTML =  enName +"'s Turn: " ;
        /*Go to the Function for the Enemy's Turn After waiting 1.5 Seconds [Emulates that the Enemy is thinking before making a move]*/
        setTimeout(EnemyTurn, 1500);
    }
}

function StatUpdate(){
    /*displays the player's Health points*/
    document.getElementById("healthData").innerHTML= plHealthCur + "/" + plHealthMax;
        /*displays the player's Mana points*/
    document.getElementById("manaData").innerHTML=  plManaCur + "/" + plManaMax;

    document.getElementById("WeaponTxt").innerHTML= "Weapon: " + plWepCur;
    document.getElementById("ArmorTxt").innerHTML= "Armor: " + plarmCur;
    
    document.getElementById("EnemyHealth").innerHTML= enHealth;
}


/*Updates the Game's information*/
function GameUpdate(){   
/*-----------UPDATE GAME INFORMATION---------*/
    /*Turn Update Function*/
    TurnUpdate();
    /*Level Update Function*/
    lvlUpdate();
    /*Gold Update Function*/
    GoldUpdate();

/*-----------SET DISPLAY---------*/
    /*Display the Enemy Health*/
    document.getElementById("EnemyHealth").innerHTML= enHealth;
    /*Tests to see if the player has no health*/
    if(plHealthCur <= 0){
        /*Go to the Function for when the player dies*/
        plDie();
    }
    /*Goes to the function that updates the stats winddow*/
    StatUpdate();
}
/*===================PLAYER ACTIONS================================*/
/*Function for when the player pushes the Attack Option on the Action Table*/
function plAttack(){
    /*Add a new sound for the when the player attacks*/
    let SlashWav= new Audio('RPG Slash.wav');
    /*sets the volume of the sound Effect*/
    SlashWav.volume = 0.3;

    /*Tests if the player can make an attack [When both the Enemy is not Dead and if they are enabled to use Actions]*/
    if (enHealth > 0 && plAct==true){
    /*---Player Can Attack---*/  
        /*tests is the Sound Effects are toggled on*/
        if (sfxOn == true){
        /*---If so--*/
            /*play the Slash Sound Effect*/
            SlashWav.play();
        }

        /*Decrease the Enemy's health by a random # based on the Player's Max Damage*/
        let playerHit = (Math.ceil(Math.random()*plDamMax));
        let DamageCalulation = playerHit-enDef;
        
        if ((DamageCalulation) > 0 ){            
            enHealth -= (playerHit-enDef);

            document.getElementById("turnTxt").innerHTML = plName + " Dealth " + DamageCalulation + " Damage!";
            document.getElementById("EnemyHealth").innerHTML= enHealth;

            setTimeout(function(){
                /*Disables the Player's Actions*/
                disablePlayerAct();
                /*Swap to the Turn Over to the Enemy*/
                turn=2
                /*Update the Game*/
                GameUpdate();
            }, 2000)
        }

        else{
            document.getElementById("turnTxt").innerHTML = "Attack was deflected!";
            
            setTimeout(function(){
                /*Disables the Player's Actions*/
                disablePlayerAct();
                /*Swap to the Turn Over to the Enemy*/
                turn=2
                /*Update the Game*/
                GameUpdate();
            }, 2000)  
        }
    }
}

/*Function when the player chooses to Run*/
function plRun(){
    /*Variable set to a random # 1-8*/
    let escChance = Math.ceil(Math.random()*8);
    /*Tests if the player is Alive and is able to Act*/
    if (enHealth > 0 && plAct==true){
        disablePlayerAct();
        /* tests for a 5/8 Chance that the player is successful*/
        if(escChance <= 5){ 

            setTimeout(function(){
                
                document.getElementById("turnTxt").innerHTML="You Try to Escape!"
            }, 1000);

            setTimeout(function(){
                
                document.getElementById("turnTxt").innerHTML="And Made it to the Shop Safely!"
            }, 3000);

            setTimeout(function(){
                /*Goes to Shop Function*/
                Shop(); 
            }, 5000);
        }
        /*tests for a 2/8 chance that the player is interrupted by a new Enemy*/
        else if(escChance  > 5 && escChance != 8){
            setTimeout(function(){
                /*Goes to Shop Function*/
                document.getElementById("turnTxt").innerHTML="You Try to Escape!";
            }, 1000);

            setTimeout(function(){
                
                document.getElementById("turnTxt").innerHTML="But Another Monster Got in the Way!";
            }, 3000);

            setTimeout(function(){
                /*Goes to Shop Function*/
                generateEnemy();
            }, 5000);
            
        }

        /*Tests for a 1/8 Chance the PLayer Fails to Run away*/
        else{
            /*----CONTINUE WITH FIGHT----*/
            setTimeout(function(){
                
                document.getElementById("turnTxt").innerHTML="You Try to Escape!";
            }, 1000);

            setTimeout(function(){
                
                document.getElementById("turnTxt").innerHTML="That Monster Caught Up To You!";
            }, 3000);

            setTimeout(function(){
            /*Goes to Continues the Fight on the Enemy's initiative*/
                /*Swaps to the Enemy's Turn*/
                turn = 2;
                /*Disable Player's Actions*/
                disablePlayerAct();
                /*Go to Enemy's Turn*/
                EnemyTurn();
            }, 5000);
            
        }
           
    } 
    
    /*Update the Game*/
    GameUpdate();
}

/*When the Player Dies*/
function plDie(){
/*-----------SET DISPLAY---------*/
    /*Makes sure the player health is 0 [prevents it from displaying as a negative]*/
    plHealthCur = 0;
    /*Disable player's actions*/
    disablePlayerAct();
    /*Enables the Death Screen*/
    document.getElementById("DeathScreen").style.display="block"
    /*disable the Enemy Screen*/
    document.getElementById("EnemyScreen").style.display="none"
    /*Apply the Game Over Theme for the Background Music*/
    bgMusic.src="PlayerDeath.wav";
    /*Go to the Background play Function*/
    playBGMusic();
}

/*=====================SHOP================================*/

/*Gives the ShopKeep a talking SFX*/
function KeepTalking(){
    if (sfxOn == true){
        let TalkWav= new Audio('Talking.wav');
        /*sets the volume of the sound Effect*/
        TalkWav.volume = 0.5;
        TalkWav.play();
    }
}

function DefaultKeepText(){
    /*Changes the Text for the Shop*/
    document.getElementById("ShopKeepText").innerHTML= "What can I do for ya?";
    /*ShopKeep talking SFX*/
    KeepTalking();
}

function Shop(){
/*----------------------SET DISPLAY---------------------*/   
    /*makes sure the game is updated*/
    
    document.getElementById("subTitle").innerHTML= "The Buy-Inn"
    /*Disables the Enemy Screen*/
    document.getElementById("EnemyScreen").style.display = "none";
    /*Disables the Result Screen*/
    document.getElementById("ResultScreen").style.display = "none";
    /*Disables the Container holding the Store Item Information*/
    document.getElementById("CostBox").style.display = "none";
    /*Disables the Container holding the Shop Items*/
    document.getElementById("RestPrice").innerHTML= "Rest: "+ restCost + " Gold";

    document.getElementById("ShopList").style.display = "none";
    /*Enables the Shop Screen*/
    document.getElementById("ShopScreen").style.display = "flex";
    /*Disables the player's actions while in the store*/
    disablePlayerAct();
    /*Swaps background music to the Shop Theme*/
    bgMusic.src = "Shop Theme.wav";
    /*Go to the Background play Function*/
    playBGMusic();
 
/*____Reset Style of Shop Screen incase of Change___*/
    /*Changes the text Color of the Section*/
    document.getElementById("ShopKeepText").style.color= "Black";
    document.getElementById("ShopKeepBox").style.border="none";
    document.getElementById("ShopKeepBox").style.backgroundColor="transparent";
    document.getElementById("Shop Buttons").style.display="block";

    /*Changes the Text for the ShopKeep*/
    document.getElementById("ShopKeepText").innerHTML= "<br>";
    setTimeout(DefaultKeepText, 1000)
    
}
/*When player hovers over a store Item*/
function UpdateShop(itemPos, itemCost, category){
    cost=itemCost;
    pos=itemPos;
    itemType = category;

    document.getElementById("CostBox").style.display="block"
    document.getElementById("CostDisplay").innerHTML= cost + " Gold";
    ItemDesc = document.getElementById("DescriptionText");

/*different definitions*/
    if (category == "wep"){
        if (pos==1){
            wepStr= 2;
        }
        if (pos==2){
            wepStr= 3;
        }
        if (pos==3){
            wepStr = 5;
        }
        if (pos==4){
            wepStr=6;
        }
        ItemDesc.innerHTML = "attack +" + wepStr;
    }

    else if(category == "arm"){
        if (pos==1){
            armDef= 2;
        }
        if (pos==2){
            armDef= 3;
        }
        if (pos==3){
            armDef = 5;
        }
        if (pos==4){
            armDef=6;
        }
        ItemDesc.innerHTML = "Defense +" + armDef;
    }

    else if (category =="itm"){
        
        if (pos==1){
            ItemDesc.innerHTML = " Recovers 5 health"
        }
        if (pos==2){
            ItemDesc.innerHTML= " Recovers 50% of your Max Health"
        }
        if (pos==3){
            ItemDesc.innerHTML = "Creates a smoke cloud that allows you to exit Battles safely"
        }
        if (pos==4){
            ItemDesc.innerHTML = "Distracts the Enemy, Granting you a free turn"
        }
    }


}

function removeCostBox(){
    document.getElementById("CostBox").style.display="none";
}

function Store(){
    /*-----------SET DISPLAY---------*/
    document.getElementById("CostBox").style.display="none";
    document.getElementById("subTitle").innerHTML= "SHOP"
    document.getElementById("ShopList").style.display="block"; 
    document.getElementById("Shop Buttons").style.display="none";
    document.getElementById("ShopKeepBox").style.border="5px ghostwhite inset";
    document.getElementById("ShopKeepBox").style.backgroundColor="Black";
    document.getElementById("ShopKeepText").style.color= "GhostWhite";
    document.getElementById("ShopKeepText").innerHTML= "<br>";
    
    /*-----------AFTER DISPLAY IS SET---------*/
    
    setTimeout(function(){
        document.getElementById("ShopKeepText").innerHTML= "What're ya buyin'?";
        /*ShopKeep talking SFX*/
        KeepTalking();
    }, 1000);

}

function buyItem(){

    if (plGold >= cost){
        plGold -= cost;
        if (sfxOn == true){
            let BuyWav= new Audio('Select.wav');
            /*sets the volume of the sound Effect*/
            BuyWav.volume = 0.5;
            /*plays the Rest SFX*/
            BuyWav.play();

            AddItem();
        }

        GoldUpdate();
    }

    else{
        cantBuy();
    }

}

function cantBuy(){
    document.getElementById("ShopKeepText").innerHTML= "You Can't Afford that!";
    /*ShopKeep talking SFX*/
    KeepTalking();
}
function AddItem(){
    if(itemType=='wep'){

        if (pos==1){
            plWepCur = "Stick";
            
        }
        if (pos==2){
            plWepCur= "Dagger";
            
        }
        if (pos==3){
            plWepCur = "Club";
        }
        if (pos==4){
            plWepCur = "Short Sword";
        }

       plDamMax = plStr + wepStr;  
    }

    if(itemType=='arm'){

        if (pos==1){
            plArmCur = "Padded";
            
        }
        if (pos==2){
            plArmCur= "Leather";
            
        }
        if (pos==3){
            plArmCur = "Chain";
        }
        if (pos==4){
            plArmCur = "Plate";
        }

       plDefMax = pldef + armDef;  
    }

    StatUpdate();
}

function Rest(){
    /*tests to see if the player is already at full Health and Mana*/
    if(plHealthCur==plHealthMax && plManaCur==plManaMax){
        /*Changes the Text for the ShopKeep*/
        document.getElementById("ShopKeepText").innerHTML= "<br>";
        
        if(plGold > restCost){
            setTimeout(function(){
                /*Changes the text for the ShopKeep*/
                document.getElementById("ShopKeepText").innerHTML= "You look Rested Enough.";
                /*ShopKeep talking SFX*/
                KeepTalking();
            }, 1000);
            
            setTimeout(DefaultKeepText, 3000);
        }

        else{
            cantBuy();
            setTimeout(DefaultKeepText, 2000);
        }
    }

    else if(plGold >= restCost){
        plGold -= restCost;
        /*Replenish the Health to match player's Maximum Health*/
        plHealthCur=plHealthMax;
        /*Replenish the Mana to match player's Maximum Mana*/
        plManaCur=plManaMax;
        /*Changes the Text for the Shop*/
        document.getElementById("ShopKeepText").innerHTML= "<br>";
        if (sfxOn == true){
            let RestWav= new Audio('fanfare.wav');
            /*sets the volume of the sound Effect*/
            RestWav.volume = 0.5;
            /*plays the Rest SFX*/
            RestWav.play();
        }

        bgMusic.pause();
        /*Delay for the length of the SFX before Updating Game*/
        setTimeout(GameUpdate, 3500);

        setTimeout(function(){
            /*Changes the Text for the ShopKeep*/
            document.getElementById("ShopKeepText").innerHTML= "What can I do for ya?";
            /*ShopKeep talking SFX*/
            KeepTalking();
            /*Go to the Background play Function*/
            playBGMusic();
        }, 4000);
    }
        else{
            cantBuy();
            setTimeout(DefaultKeepText, 2000);
        }
}

function CheckTabs(category){
    if (category=='wep'){
        document.getElementById("Weapon List").style.display="block";
        document.getElementById("Armor List").style.display="none";
        document.getElementById("Item List").style.display="none";

        document.getElementById("DescriptionText").innerHTML="ATK: +3";
    }

    else if (category=='arm'){
        document.getElementById("Weapon List").style.display="none";
        document.getElementById("Armor List").style.display="block";
        document.getElementById("Item List").style.display="none";

        document.getElementById("DescriptionText").innerHTML="DEF: +2";
    }

    else if (category=='itm'){
        document.getElementById("Weapon List").style.display="none";
        document.getElementById("Armor List").style.display="none";
        document.getElementById("Item List").style.display="block";

        document.getElementById("DescriptionText").innerHTML="Recovers 5 HP";
    }

}

/*===================TOGGLES================================*/

/*Function to Toggle Sound Effects On/Off*/
function ToggleSFX(){
    /*Variable that targets the SFX Toggle Button*/
    let sfxBtn = document.getElementById("sfxToggle");
    
    /*If the SFX are on when clicked:*/
    if(sfxOn == true){
        /*Turn the SFX Boolean to false [OFF]*/
        sfxOn= false;
        /*Change the text inside the button*/
        sfxBtn.innerHTML="SFX OFF";
        /*change the the background color of the button*/
        sfxBtn.style.backgroundColor = "grey";
    }

    /*Else, when the SFX is Off when the Button in clicked*/
    else{
        /*Turn the SFX Boolean to true [ON]*/
        sfxOn= true;
        /*Change the text inside the button*/
        sfxBtn.innerHTML="SFX ON";
        /*change the the background color of the button*/
        sfxBtn.style.backgroundColor = "ghostwhite";
    }
}

/*Function to Toggle the page Theme To light/Dark Mode*/
function ToggleDKMD(){
    /*Variable that Targets the HTML body*/
    let body = document.getElementsByTagName("BODY")[0];
    
    /*If the page is on Light Mode when clicked:*/
    if(dkmdOn == false){
        /*set the PageTheme Boolean to True [Set to Dark Mode]*/
        dkmdOn= true;
        /*Change the Text inside the Button*/
        document.getElementById("darkModeToggle").innerHTML="Light Mode";
        /*change the body's background to black*/
        body.style.backgroundColor = "black";
        /*change the body's Text color to white*/
        body.style.color = "ghostWhite";

    }

    /*If the page is on Dark Mode when clicked:*/
    else{
        /*set the PageTheme Boolean to false [Set to Light Mode]*/
        dkmdOn = false;
        /*Change the Text inside the Button*/
        document.getElementById("darkModeToggle").innerHTML="Dark Mode";
        /*change the body's background to White*/
        body.style.backgroundColor = "ghostwhite";
        /*change the body's Text color to black*/
        body.style.color = "black";
    }
}

/*Function to Toggle the page Theme To light/Dark Mode*/
function ToggleMusic(){
    /*Variable that targets the SFX Toggle Button*/
    let muzBtn = document.getElementById("musicToggle");
    
    /*If the Music is on when clicked:*/
    if(muzOn == true){
        /*Turn the Music Boolean to false [OFF]*/
        muzOn = false;
        /*Pause the Music*/
        bgMusic.pause();
        /*Turn off autoplay*/
        bgMusic.autoplay = false;
        /*Change the text inside the button*/
        muzBtn.innerHTML="MUSIC OFF";
        /*change the the background color of the button*/
        muzBtn.style.backgroundColor = "grey";
    }

    /*Else, when the Music is Off when the Button in clicked*/
    else{
        /*Turn the Music Boolean to true [ON]*/
        muzOn= true;
        /*Go to the Background play Function*/
        playBGMusic();
        /*Change the text inside the button*/
        muzBtn.innerHTML="MUSIC ON";
        /*change the the background color of the button*/
        muzBtn.style.backgroundColor = "ghostwhite";
    }
}