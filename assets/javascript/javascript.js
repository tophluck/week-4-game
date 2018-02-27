var toph = {
    hitpoints: 200,
    attack: 10,
    baseAttack: 10,
    counterattack: 30,
    alive: true,
    choosen: false,
    defending: false
};

var zuko = {
    hitpoints: 150,
    baseAttack: 15,
    attack: 15,
    counterattack: 40,
    alive: true,
    choosen: false,
    defending: false
};

var katara = {
    hitpoints: 180,
    baseAttack: 8,
    attack: 8,
    counterattack: 20,
    alive: true,
    choosen: false,
    defending: false
};

var aang = {
    hitpoints: 240,
    baseAttack: 6,
    attack: 6,
    counterattack: 10,
    alive: true,
    choosen: false,
    defending: false
};

var startGameState = true;
var noDefenderGameState = false;
var attackingGameState = false;
var choosenCharacter = {};
var defender = {};

function attack() {
    defender.hitpoints = defender.hitpoints - this.attack;
    $(".defenderHP").text(defender.hitpoints)
    this.attack = this.attack + this.baseAttack;
};

function counterAttack() {
    choosenCharacter.hitpoints = choosenCharacter.hitpoints - this.counterattack;
    $(".choosenCharacterHP").text(choosenCharacter.hitpoints);
};

function checkGameStates() {
    console.log("game states: " + startGameState + " " + noDefenderGameState + " " + attackingGameState);
};

checkGameStates();

$("#tophImage").on("click", function() {
    if (noDefenderGameState && toph.choosen === false) {
        defender = toph;
        $("#toph").addClass("defender");
        $("#tophHP").addClass("defenderHP");
        $("#defender").append("#toph");
        noDefenderGameState = false;
        attackingGameState = true;
        console.log("defender is " + defender);
    } else if (startGameState) {
        choosenCharacter = toph;
        $("#toph").addClass("choosenCharacter");
        $("#tophHP").addClass("choosenCharacterHP")
        $("#yourCharacter").append("#toph");
        $("#enemies").append("#zuko #katara #aang");
        startGameState = false;
        noDefenderGameState = true;
        console.log("choosen character is " + choosenCharacter);
    };
    checkGameStates();
})