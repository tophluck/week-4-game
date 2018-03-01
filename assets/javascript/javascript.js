var characters = {
    "toph": {
        "hitpoints": 200,
        "attack": 10,
        "baseAttack": 10,
        "counterattack": 35,
        "alive": true,
    },
    "zuko": {
        "hitpoints": 150,
        "baseAttack": 15,
        "attack": 15,
        "counterattack": 50,
        "alive": true,
    },
    "katara": {
        "hitpoints": 180,
        "baseAttack": 12,
        "attack": 12,
        "counterattack": 25,
        "alive": true,
    },
    "aang": {
        "hitpoints": 240,
        "baseAttack": 11,
        "attack": 11,
        "counterattack": 15,
        "alive": true,
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


function gameReset() {
    characters = {
        "toph": {
            "hitpoints": 200,
            "attack": 10,
            "baseAttack": 10,
            "counterattack": 35,
            "alive": true,
        },
        "zuko": {
            "hitpoints": 150,
            "baseAttack": 15,
            "attack": 15,
            "counterattack": 50,
            "alive": true,
        },
        "katara": {
            "hitpoints": 180,
            "baseAttack": 8,
            "attack": 8,
            "counterattack": 25,
            "alive": true,
        },
        "aang": {
            "hitpoints": 240,
            "baseAttack": 8,
            "attack": 8,
            "counterattack": 15,
            "alive": true,
        }
    };
    
    startGameState = true;
    noDefenderGameState = false;
    attackingGameState = false;
    endGameState = false;
    choosenCharacter = "";
    defender = "";
    $("<h1>").append($(".character"));
    $(".toph-HP").text("200");
    $(".zuko-HP").text("150");
    $(".katara-HP").text("180");
    $(".aang-HP").text("240");
    $(":hidden").toggle();
    $(".resetButton").remove();
};

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
            resetButton();
        }
        if (characters.toph.alive === false && characters.zuko.alive === false && characters.katara.alive === false && characters.aang.alive === false){
            $("#gameMessage").text("You won! Press the reset button to play again.");
            noDefenderGameState = false;
            attackingGameState = false;
            endGameState = true;
            resetButton();
        }
    };
});

$(".resetButton").on("click", function() {
    gameReset();
});

// Only thing I need to finish this is to get the reset button to work. I believe what I'd need to do to fix this is change it so that clicking the reset button (and running the corresponding function) re-creates the the 4 character divs using a loop that runs through the characters object and creates a div for each character. I would need to update each character in the characters object with their corresponding image sources to get this to work. 

// Once I have done this, I would be able to remove the html that's currently in the index.html document for those 4 divs, and just run the 'gameReset' function upon page load.