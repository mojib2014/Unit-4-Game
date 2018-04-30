// When page loads
$(document).ready(function() {

	// luke object
	var luke = {
		nickName: 'luke',
		name: 'Luke Skywalker',
		health: 100,
		attack: 8,
		image: '<img src="assets/images/Luke.jpg" class="image">'
	};

	// maul object
	var maul = {
		nickName: 'maul',
		name: 'Darth Maul',
		health: 130,
		attack: 10,
		image: '<img src="assets/images/DarthMaul.jpg" class="image">'
	};

	// yoda object
	var yoda = {
		nickName: 'yoda',
		name: 'Master Yoda',
		health: 150,
		attack: 2,
		image: '<img src="assets/images/MasterJoda.jpg" class="image">'
	};

	// kilo object
	var kilo = {
		nickName: 'kilo',
		name: 'Kilo Ren',
		health: 80,
		attack: 7,
		image: '<img src="assets/images/KiloRen.jpg" class="image">'
	};

	// Array of character objects
	var charactersObjects = [luke, maul, yoda, kilo];

	// Array of strings with characters nick names
	var characters = [];
	var $yourCharacter;
	var $currentEnemy;
	// Your Character's health and attack
	var yourHealth;
	var yourAttack;
	// current's enemy's health and attack
	var currentEnemyHealth = 0;
	var currentEnemyAttack = 0;

	var counter = 0;
	var compoundAttack = 0;
	var isThereOpponent = false;

// ====================== FUNCTIONS =======================

	function startGame() {
		new Audio('assets/sound-effects/battle-of-the-heroes.mp3').play()

		createCharacters(charactersObjects);
		pickYourCharacter();
		pickYourOpponent();
		// fight();
	}


	// function to create each box/character in the DOM
	function createCharacters(arg) {
		if (arg.length === 4 ) {

			for ( var i = 0; i < arg.length; i++) {

				// jQuery Object that takes the attributes of each character
				var $character = $('<div id='+arg[i].nickName+'>');
				$character.append('<div class="characterName">'+arg[i].name);
				$character.append(arg[i].image);
				$character.append('<div class="characterHealth">'+arg[i].health);
				$character.attr('data_nickName', arg[i].nickName);
				$character.attr("data_name", arg[i].name);
				$character.attr('data_attack', arg[i].attack);
				$character.attr('data_health', arg[i].health);
				$character.attr('class', 'character col-md-3');

				characters.push(arg[i].nickName);

				$('#characters').append($character);

				}
			} // end of if statement

			else if (arg.length <= 3 ) {

				$('#remainingEnemies').empty()

				characters = [];

				$('#remainingEnemies').append('<div class="title">Remaining Enemies</div>')
				for ( var i = 0; i < arg.length; i++) {

					// jQuery Object that takes the attributes of each character
					var $character = $('<div id='+arg[i].nickName+'>');
					$character.append('<div class="characterName">'+arg[i].name);
					$character.append(arg[i].image);
					$character.append('<div class="characterHealth">'+arg[i].health);
					// att data attributes to use with the logic of the game
					$character.attr('data_nickName', arg[i].nickName);
					$character.attr("data_name", arg[i].name);
					$character.attr('data_attack', arg[i].attack);
					$character.attr('data_health', arg[i].health);
					$character.attr('class', 'enemy');

					characters.push(arg[i].nickName);

					$('#remainingEnemies').append($character);
				}

				if (!$currentEnemy) {
					pickYourOpponent();
				}
			}

	}; // CLOSING createCharacter

	function pickYourCharacter() {
		// TODO
		// this function should pick your character and then automaticaly make the other charaters enemies.
		$('.character').on('click', function() {
			$('#characters').empty();
			$('#characters').append('<div class="title">Your Character</div>')

			$yourCharacter = $(this);
			$yourCharacter.addClass('yourCharacter');
			$yourCharacter.removeClass('col-md-3 character');

			yourHealth = parseInt($yourCharacter.attr('data_health'));
			yourAttack = parseInt($yourCharacter.attr('data_attack'));

			$('#characters').append($yourCharacter);

			$('#remainingEnemies').append('<div class="title">Pick Your Enemy</div>');

			// remove the chosen character and then run the createCharacters function again to recreate the 'enemies'
			var indexRemove = characters.indexOf($yourCharacter.attr('data_nickName'))
			charactersObjects.splice(indexRemove, 1);

			// call createCharacters function again, but this time there are only 3
			createCharacters(charactersObjects);

		});
	};

	function pickYourOpponent() {

			$('.enemy').on('click', function() {
				$('#characters').empty();
				$('#currentEnemy').empty();
				$('#fightButton').empty();

				// enemy picked
				$currentEnemy = $(this);

				$currentEnemy.addClass('currentEnemy');
				$currentEnemy.removeClass('enemy');

				// append your character and enemy picked to the fighting area
				$('#yourCharacter').append($yourCharacter);

				$('#fightButton').append('<img src="http://vignette1.wikia.nocookie.net/starwars/images/d/df/Dueling_lightsabers.svg/revision/latest/scale-to-width-down/500?cb=20100526152749" id="lightSabers">')

				$('#currentEnemy').append($currentEnemy);
				isThereOpponent = true;


				var indexRemove = characters.indexOf($currentEnemy.attr('data_nickName'));
				charactersObjects.splice(indexRemove, 1);

				createCharacters(charactersObjects);

				currentEnemyAttack = 0;
				console.log(currentEnemyAttack);

				// Your enemy's health and attack
				currentEnemyAttack = parseInt($currentEnemy.attr('data_attack'));
				// console.log("CURRENT ENEMY ATTACK: ", currentEnemyAttack);
				currentEnemyHealth = parseInt($currentEnemy.attr('data_health'));

				console.log('IS THERE OPPONENT: ' + isThereOpponent)

				// Check if there is an opponent
				$('#lightSabers').on('click', function() {
					if (isThereOpponent) {
						fight();
					} else {
						alert('YOU NEED TO PICK AN OPPONENT');
					}
				});
			});
	};


	function fight() {

		// We need to isolate the lightsabers click function in order to create some conditions that allow me to stop the game when it doesn't meet some parameters

			counter++;

			compoundAttack += yourAttack;
			console.log("COMPOUND ATTACK: ", compoundAttack);

			// After attack
			currentEnemyHealth = currentEnemyHealth - compoundAttack;
			yourHealth = yourHealth - currentEnemyAttack;
			console.log("CURRENT ENEMY ATTACK: ", currentEnemyAttack);
			console.log("ENEMY HEALTH: ",currentEnemyHealth);
			console.log("YOUR HEALTH: ",yourHealth);


			$('.currentEnemy > .characterHealth').html(currentEnemyHealth).animate({
				fontSize: 60,
				color: '#FF0000'
			}, 300, function() {
				$(this).animate({
					fontSize: 20,
					color: 'white'
				}, 300);
			});
			$('.yourCharacter > .characterHealth').html(yourHealth).animate({
				fontSize: 60,
				color: '#FF0000'
			}, 300, function() {
				$(this).animate({
					fontSize: 20,
					color: 'white'
				}, 300);
			});

			if (currentEnemyHealth <= 0 && yourHealth > 0) {

				isThereOpponent = false;
				yourHealth = yourHealth - currentEnemyAttack;

				console.log("YOU HAVE DEFEATED " + $currentEnemy.attr('data_nickName'));
				console.log('IS THERE OPPONENT: ' + isThereOpponent)

				$('#currentEnemy').empty();

				// currentEnemyAttack = 0;

				if (characters.length === 0) {
					alert("Congrats, You WON");
					restartGame();
				} else {
					pickYourOpponent();
				};
			}

			else if (yourHealth <= 0) {
				alert("You have been defeated");
				alert("try again");
				restartGame();
			};
	};

	function restartGame() {
		$('.row').empty();
		$('.restart').append('<button class="restartBtn btn btn-lg btn-warning">Restart Game</button>');
			$('.restartBtn').on('click', function() {
				location.reload();
			})
	}



			// 	$(document).on('click', '#lightSabers', function() {
			// 		counter++;
			// 		console.log("CLICKED LIGHTSABERS");
			// 		fight();
			// 	});
			// }

			// else if (yourHealth <= 0 && currentEnemyHealth > 0) {
			// 	console.log("You lost");
			// 	$('#remainingEnemies').empty();
			// 	$('#remainingEnemies').append('<div class="title">You Lost</div>');
			// 	$('#remainingEnemies').append('<button class="btn btn-default btn-lg">RESTART');

			// }

			// else if (yourHealth > 0 && currentEnemyHealth <= 0) {
			// 	console.log('Enemy defeated');
			// 	$('#currentEnemy').empty();

			// 	pickYourOpponent();

			// }

		// }

// =========================================================


// ====================== START GAME ====================
	// Start the game
	startGame();

}); // CLOSING BRACKET FOR DOCUMENT LOAD

// NEW OBJECTIVE, NOTHING SHOULD WORK UNLESS THE NEW ENEMY IS SELECTED. CREATE A BOOLEAN THAT HAS TO BE TRUE IN ORDER TO CONTINUE THE GAME

$(document).ready(function() {

    var $lightSaberSound = $("#lightSaber");
    
        $(".character > .image").on('mouseenter', function() {
            $lightSaberSound.get(0).play();
        });
    
        $(".character > .image").on('mouseout', function() {
            $lightSaberSound.get(0).pause();
            $lightSaberSound.get(0).currentTime = 0;
        });
    
    var $enemySaberSound = $('#enemySound');
    
        $(".enemy > .image").on('mouseenter', function() {
            $enemySaberSound.get(0).play();
        });
    
        $(".enemy > .image").on('mouseout', function() {
            $enemySaberSound.get(0).pause();
            $enemySaberSound.get(0).currentTime = 0;
        });
    
    });