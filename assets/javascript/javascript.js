var characters = {
    "toph": {
        "name": "toph",
        "hitpoints": 200,
        "attack": 10,
        "baseAttack": 10,
        "counterattack": 35,
        "alive": true,
        "image": "assets/images/toph_4.png"
    },
    "zuko": {
        "name": "zuko",
        "hitpoints": 150,
        "baseAttack": 15,
        "attack": 15,
        "counterattack": 50,
        "alive": true,
        "image": "assets/images/zuko_4.png"
    },
    "katara": {
        "name": "katara",
        "hitpoints": 180,
        "baseAttack": 12,
        "attack": 12,
        "counterattack": 25,
        "alive": true,
        "image": "assets/images/katara_1.png"
    },
    "aang": {
        "name": "aang",
        "hitpoints": 240,
        "baseAttack": 11,
        "attack": 11,
        "counterattack": 15,
        "alive": true,
        "image": "assets/images/aang_4.png"
    }
};

var startGameState = true;
var noDefenderGameState = false;
var attackingGameState = false;
var endGameState = false;
var choosenCharacter = "";
var defender = "";

function attack() {
    $("#gameMessage").text("You dealt " + characters[choosenCharacter].attack + " damage");
    characters[defender].hitpoints = characters[defender].hitpoints - characters[choosenCharacter].attack;
    characters[choosenCharacter].attack = characters[choosenCharacter].attack + characters[choosenCharacter].baseAttack;
    $(".defenderHitpoints").text(characters[defender].hitpoints);
};

function counterAttack() {
    var currentText = $("#gameMessage").text();
    $("#gameMessage").text(currentText + ". You were dealt " + characters[defender].counterattack + " damage");
    characters[choosenCharacter].hitpoints = characters[choosenCharacter].hitpoints - characters[defender].counterattack;
    $(".choosenCharacterHitpoints").text(characters[choosenCharacter].hitpoints);
};

function resetButton() {
    var resetButton = $("<button>");
    resetButton.toggleClass("resetButton");
    resetButton.text("Reset");
    $("#gameMessage").append(resetButton);
}


function gameStart() {

    for (var key in characters) {
        var specificCharacter = characters[key]; 
        var characterDiv = $("<div>");
        characterDiv.attr("id", specificCharacter.name);
        characterDiv.toggleClass("character");
        characterDiv.attr("data-name", specificCharacter.name);
        characterDiv.attr("data-choosen", "false");
        characterDiv.html("<h4>" + specificCharacter.name +"</h4> <img height='200px' src='" + specificCharacter.image + "'> <p>" + specificCharacter.hitpoints + "</p>");
        $("#start").append(characterDiv);
   };
    $("#gameMessage").text("Click on a Character to begin!");
    $("#resetButton").hide()
};

gameStart();

$(".character").on("click", function() {
    if (noDefenderGameState && $(this).attr("data-choosen") === "false") {
        defender = $(this).attr("data-name");
        $("#defender").append($(this));
        $(this).toggleClass("defender");
        $(this).find("p").toggleClass("defenderHitpoints");
        $("#gameMessage").text(" ");
        noDefenderGameState = false;
        attackingGameState = true;
    } else if (startGameState) {
        choosenCharacter = $(this).attr("data-name");
        $("#enemies").append($(".character"));
        $("#yourCharacter").append($(this));
        $(this).find("p").toggleClass("choosenCharacterHitpoints");
        $(this).attr("data-choosen", "true");
        $("#gameMessage").text("Choose who you want to attack first");
        characters[choosenCharacter].alive = false;
        startGameState = false;
        noDefenderGameState = true;
    }
});

$("#attackButton").on("click", function() {
    if (noDefenderGameState) {
        $("#gameMessage").text("Choose a character to fight");
    } else if (attackingGameState) {
        attack();
        if (characters[defender].hitpoints <= 0) {
            var currentText = $("#gameMessage").text();
            $("#gameMessage").text(currentText + ". You have defeated " + defender + ". Choose your next opponent.");
            characters[defender].alive = false;
            $(".defender").remove();
            attackingGameState = false;
            noDefenderGameState = true;
        } else {
            counterAttack();
        };
        if (characters[choosenCharacter].hitpoints <= 0) {
            $("#gameMessage").text("You have been defeated. Game Over. Press the reset button to play again.");
            attackingGameState = false;
            endGameState = true;
            $("#resetButton").show();
        }
        if (characters.toph.alive === false && characters.zuko.alive === false && characters.katara.alive === false && characters.aang.alive === false){
            $("#gameMessage").text("You won! Press the reset button to play again.");
            noDefenderGameState = false;
            attackingGameState = false;
            endGameState = true;
            $("#resetButton").show();
        }
    };
});

$("#resetButton").on("click", function() {
    location.reload();
});

// game doesn't work after reset button is pressed. Not sure why.