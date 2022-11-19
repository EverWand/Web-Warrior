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

/*Variable used to Call different Background Music*/
let bgMusic = document.getElementById("BGMusic");

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
let plHealthMax = 16;
/*variable used to give a current health tracker for the player*/
let plHealthCur = plHealthMax;
/*Variable used to set the player's maximum Mana*/
let plManaMax = 5;
/*Variable used to keep track of the Player's mana*/
let plManaCur = plManaMax;
/*Variable used to set the player's Maximum Damage*/
let plDamMax = 3;
/*String to give the Player a Name*/
let plName= '';
/*Variable used to keep track if the player can Act in battle*/
let plAct = false;

/*------------------Shop--------------------*/
let itemCost = 0;

/*=====================COMMANDS====================================*/
function playBGMusic(){
    /*Tests if Music is toggled on*/
    if (muzOn == true){
        /*lower the music's volume by 70%*/
        bgMusic.volume = 0.7;
        /*play the Background Music*/
        bgMusic.play();
    }
}
function Start(){
    /*Apply the Title Theme to the Background music*/
    bgMusic.src="Sound Files/Music/Title Theme.wav";
    /*plays the Background Music*/
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
    plManaMax = 5;
    /*sets the Player's Current Mana to the maximum amount*/
    plManaCur = plManaMax;
    /*Sets the player's Max Damage*/
    plDamMax = 3; /*[should calculate the Player strength and weapon boost]*/

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
    bgMusic.src="Sound Files/Music/Custom Made Battle Theme.wav";
    /*plays the Background Music*/
    bgMusic.play();
    /*Enables the Enemy Screen*/
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
            document.getElementById("EnemySprite").src="Sprites/Enemies/slime blue.png";
        }
        /*if the enemy Number is 1 --> [SKELETON STATS]*/
        else{
            /*Give the Enemy a name*/
            enName = "Skeleton";
            /*set the EXP for the Enemy rewards*/
            enEXP =  2 + Math.ceil(enLvl/2);
            /*set the Gold for the Enemy rewards*/
            enGold = 2 + Math.ceil(enLvl/2);
            /*Gives the Enemy it's health*/
            enHealth = 6 + enLvl;
            /*gives the Enemy a maximum attack*/
            enDamMax = 2 + enLvl;
            /*Changes the Image of the enemy to it's proper Sprite*/
            document.getElementById("EnemySprite").src="Sprites/Enemies/Skeleton.png";
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
    let plActMenu = document.querySelectorAll(".actionTxt");
    
    /*Changes the background colore of each Table Data tag of the Action Menu*/
    plActMenu[0].style.backgroundColor="Grey";  /*1st CELL*/
    plActMenu[1].style.backgroundColor="Grey";  /*2nd CELL*/
    plActMenu[2].style.backgroundColor="Grey";  /*3rd CELL*/
    plActMenu[3].style.backgroundColor="Grey";  /*4th CELL*/

/*----------------------AFTER DISPLAY IS SET---------------------*/
    /*Makes it so that the player Act Boolean is false*/
    plAct = false;

}

/*Enables the PLayer's Actions while in Combat*/
function EnablePlayerAct(){
/*----------------------SET DISPLAY---------------------*/ 
    /*Variable that targets the player's Actions from the inside the HTML File*/
    let plActMenu = document.querySelectorAll(".actionTxt");
    
    /*Changes the background colore of each Table Data tag of the Action Menu*/
    plActMenu[0].style.backgroundColor="lightblue"; /*1st CELL*/
    plActMenu[1].style.backgroundColor="lightblue"; /*2nd CELL*/
    plActMenu[2].style.backgroundColor="lightblue"; /*3rd CELL*/
    plActMenu[3].style.backgroundColor="lightblue"; /*4th CELL*/

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
        /*turn the background of the Player pool container Red [Emulates getting hit]*/
        document.getElementById("hpmp").style.backgroundColor="Red";
        /*Player loses health by random # based on the enemy's Maximum Damage*/
        plHealthCur -= Math.ceil(Math.random()*enDamMax); /*[HAVE TO EDIT TO CALCULATE PLAYER DEFENSE AND ENEMY ATTACK]*/

    /*---------RED REPAIR---------*/
        /*Delays the content inside by a Half-Second*/
        setTimeout(function() {
            /*turn the background of the Player pool container back to its default*/
            document.getElementById("hpmp").style.backgroundColor="khaki";
            
        }, 500); 
    }
    
    /*if the Enemy doesn't have health above zero, default to this*/
    else{
        /*Go to the Battle Results [The enemy is probably slain]*/
        BattleResult();
    }

/*----------------------AFTER DISPLAY HAS BEEN SET---------------------*/ 
    /*Hands the Turn Over to the Player*/
    turn=1;
    /*Enable the Player's Actions*/
    EnablePlayerAct();

    /*Update the Game*/
    GameUpdate();
    
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
        document.getElementById("BGMusic").src="Sound Files/Music/Victory.wav";
        /*disables the Enemy Screen*/
        document.getElementById("EnemyScreen").style.display = "none";
        /*Enables the Results Screen*/
        document.getElementById("ResultScreen").style.display = "block";
        
        /*Display the amount of Experience rewarded*/
        document.getElementById("expReward").innerHTML = "EXP: +" + enEXP;
        /*Display the amount of Gold rewarded*/
        document.getElementById("goldReward").innerHTML = "Gold: +" + enGold;
    }

/*Update the Player's Experience and Level Information*/
function lvlUpdate(){
/*-----------------PLAYER LEVEL UP!----------------------*/
    /*Tests if the player has met the required Experience to Level up*/
    if(plEXP >= initEXPUntil){
    /*---LEVEL BOOSTS---*/    
        /*increase the Player's level by 1*/
        plLvl ++
        /*Increases the Expererience requirement*/
        initEXPUntil += 25;
        /*Caculates how far the player is to the next level*/
        curEXPUntil = initEXPUntil - plEXP;
        /*increases the players max Damage by 1*/
        plDamMax ++;
        /*increases the Players Max Health by 2*/
        plHealthMax += 2;
        /*Increases the Players max Mana by 1*/
        plManaMax ++;
    }

/*----------------------SET DISPLAY---------------------*/ 
    /*Displays the Player's level*/
    document.getElementById("lvlTxt").innerHTML = "Level: " + plLvl;
    /*Displays the PLayer's Current EXP*/
    document.getElementById("curEXPTxt").innerHTML = plEXP;
    /*Displays the EXP Left until level Up*/
    document.getElementById("UntilLvlTxt").innerHTML = initEXPUntil - plEXP;
    
}

/*Updates the player's Gold Information*/
function GoldUpdate(){
/*-------------------BUY ITEM----------------------*/

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
        /*displays the player's Health points*/
    document.getElementById("healthData").innerHTML= plHealthCur + "/" + plHealthMax;
        /*displays the player's Mana points*/
    document.getElementById("manaData").innerHTML=  plManaCur + "/" + plManaMax;
}

/*===================PLAYER ACTIONS================================*/
/*Function for when the player pushes the Attack Option on the Action Table*/
function plAttack(){
    /*Add a new sound for the when the player attacks*/
    let SlashWav= new Audio('Sound Files/SFX/RPG Slash.wav');
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
        enHealth = enHealth - (Math.ceil(Math.random()*plDamMax));
        
        /*Disables the Player's Actions*/
        disablePlayerAct();
        /*Swap to the Turn Over to the Enemy*/
        turn=2
    }
    /*Update the Game*/
    GameUpdate();
}

/*Function when the player chooses to Run*/
function plRun(){
    /*Variable set to a random # 1-8*/
    let escChance = Math.ceil(Math.random()*8);
    /*Tests if the player is Alive and is able to Act*/
    if (enHealth > 0 && plAct==true){
        /* tests for a 5/8 Chance that the player is successful*/
        if(escChance <= 5){
            /*Goes to Shop Function*/
            Shop(); 
        }
        /*tests for a 2/8 chance that the player is interrupted by a new Enemy*/
        else if(escChance  > 5 && escChance != 8){
            generateEnemy();
        }

        /*Tests for a 1/8 Chance the PLayer Fails to Run away*/
        else{
        /*----CONTINUE WITH FIGHT----*/
            /*Swaps to the Enemy's Turn*/
            turn = 2
            /*Disable Player's Actions*/
            disablePlayerAct();
            /*Go to Enemy's Turn*/
            EnemyTurn();
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
    document.getElementById("BGMusic").src="Sound Files/Music/PlayerDeath.wav";
}

/*=====================SHOP================================*/

/*Gives the ShopKeepe a talking SFX*/
function KeepeTalking(){
    if (sfxOn == true){
        let TalkWav= new Audio('Sound Files/SFX/Talking.wav');
        /*sets the volume of the sound Effect*/
        TalkWav.volume = 0.5;
        TalkWav.play();
    }
}
function DefaultKeepeText(){
    setTimeout(function(){
        /*Changes the Text for the ShopKeepe*/
        document.getElementById("ShopKeepeText").innerHTML= "What can I do for ya?";
        /*ShopKeepe talking SFX*/
        KeepeTalking();
    }, 1000);
}

function Shop(){
/*----------------------SET DISPLAY---------------------*/   
    document.getElementById("EnemyScreen").style.display = "none";
    document.getElementById("ResultScreen").style.display = "none";
    
    document.getElementById("CostBox").style.display = "none";
    document.getElementById("ShopList").style.display = "none";
    document.getElementById("ShopScreen").style.display = "flex";

    document.getElementById("BGMusic").src="Sound Files/Music/Shop Theme.wav";
    document.getElementById("ShopKeepeSprite").src = "Sprites/NPCs/ShopKeepeSprite.png";
    
    document.getElementById("ShopKeepeText").style.color= "Black";
    document.getElementById("ShopKeepeBox").style.border="none";
    document.getElementById("ShopKeepeBox").style.backgroundColor="transparent";
    document.getElementById("Shop Buttons").style.display="block";

    /*Changes the Text for the ShopKeepe*/
    document.getElementById("ShopKeepeText").innerHTML= "<br>";
    
    DefaultKeepeText();
}
/*When player hovers over a store Item*/
function UpdateShop(){

    document.getElementById("CostDisplay").innerHTML= itemCost + " Gold";
}

function Buy(){
    /*-----------SET DISPLAY---------*/
    document.getElementById("ShopList").style.display="block"; 
    document.getElementById("Shop Buttons").style.display="none";
    document.getElementById("CostBox").style.display="block";

    document.getElementById("ShopKeepeBox").style.border="5px ghostwhite inset";
    document.getElementById("ShopKeepeBox").style.backgroundColor="Black";
    document.getElementById("ShopKeepeText").style.color= "GhostWhite";
    document.getElementById("ShopKeepeText").innerHTML= "";
    /*-----------AFTER DISPLAY IS SET---------*/
    setTimeout(function(){
        document.getElementById("ShopKeepeText").innerHTML= "What're ya buyin'?";
        /*ShopKeepe talking SFX*/
        KeepeTalking();
    }, 1000);
}

function Rest(){
    /*tests to see if the player is already at full Health and Mana*/
    if(plHealthCur==plHealthMax && plManaCur==plManaMax){
        /*Changes the Text for the ShopKeepe*/
        document.getElementById("ShopKeepeText").innerHTML= "<br>";
        setTimeout(function(){
            /*Changes the text for the ShopKeepe*/
            document.getElementById("ShopKeepeText").innerHTML= "You look Rested Enough.";
            /*ShopKeepe talking SFX*/
            KeepeTalking();
        }, 1000);
        
        DefaultKeepeText();
    }
        
    else{
        /*Replenish the Health to match player's Maximum Health*/
        plHealthCur=plHealthMax;
        /*Replenish the Mana to match player's Maximum Mana*/
        plManaCur=plManaMax;
        /*Changes the Text for the ShopKeepe*/
        document.getElementById("ShopKeepeText").innerHTML= "<br>";

        if (sfxOn == true){
            let RestWav= new Audio('Sound Files/SFX/fanfare.wav');
            /*sets the volume of the sound Effect*/
            RestWav.volume = 0.5;
            /*plays the Rest SFX*/
            RestWav.play();
        }

        document.getElementById("BGMusic").onpause();
        /*Delay for the length of the SFX before Updating Game*/
        setTimeout(GameUpdate, 3500);
        
        DefaultKeepeText();
    }
}

function CheckTabs(category){
    if (category=='wep'){
        document.getElementById("Weapon List").style.display="block";
        document.getElementById("Armor List").style.display="none";
        document.getElementById("Item List").style.display="none";

        document.getElementById("Definition Text").innerHTML="ATK: +3";
    }

    else if (category=='arm'){
        document.getElementById("Weapon List").style.display="none";
        document.getElementById("Armor List").style.display="block";
        document.getElementById("Item List").style.display="none";

        document.getElementById("Definition Text").innerHTML="DEF: +2";
    }

    else if (category=='itm'){
        document.getElementById("Weapon List").style.display="none";
        document.getElementById("Armor List").style.display="none";
        document.getElementById("Item List").style.display="block";

        document.getElementById("Definition Text").innerHTML="Recovers 5 HP";
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

function ToggleMusic(){
    /*Variable that targets the SFX Toggle Button*/
    let muzBtn = document.getElementById("musicToggle");
    
    /*If the SFX are on when clicked:*/
    if(muzOn == true){
        /*Turn the SFX Boolean to false [OFF]*/
        muzOn= false;
        bgMusic.pause();
        /*Change the text inside the button*/
        muzBtn.innerHTML="MUSIC OFF";
        /*change the the background color of the button*/
        muzBtn.style.backgroundColor = "grey";
    }

    /*Else, when the Music is Off when the Button in clicked*/
    else{
        /*Turn the Music Boolean to true [ON]*/
        muzOn= true;
        /*Change the text inside the button*/
        muzBtn.innerHTML="MUSIC ON";
        /*change the the background color of the button*/
        muzBtn.style.backgroundColor = "ghostwhite";
    }
}