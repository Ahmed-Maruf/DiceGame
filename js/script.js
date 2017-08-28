




var scores, roundScore, activePlayer, gameOn, prevDice;
var holdDice = document.getElementById('dice-1');
var holdDice1 = document.getElementById('dice-2');

function  init() {
	scores = [0,0];
	roundScore = activePlayer = prevDice = 0;
	gameOn = 1;

	/*
	document.querySelector('#current-'+activePlayer).textContent = dice;*/

	/*var hold = document.querySelector('#score-0').textContent;*/
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}

init();


function dry(pos) {

	if(pos==1){
		holdDice.style.display = 'block';
		holdDice1.style.display = 'block';
	}
	else{
		holdDice.style.display = 'none';
		holdDice1.style.display = 'none';
	}

}
document.querySelector('.btn-roll').addEventListener('click', function () {


	if(gameOn==1)
	{
		//1. A randon number
		var dice = Math.floor(Math.random()*6)+1;
		var dice1 = Math.floor(Math.random()*6)+1;
		//2. Display the result
		holdDice.src = 'image/dice-' + dice + '.png';
		holdDice1.src = 'image/dice-' + dice1 + '.png';
		dry(1);
		//3. Update the round score If the rolled number is not a 1!!!


		if(dice!==1 && dice1!==1){
			// Add Score

			roundScore +=(dice+dice1);
			document.querySelector('#current-'+activePlayer).innerHTML='<em>' + roundScore + '</em>';
		}
		else{
			//Next player turn
			/*document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')*/
			document.getElementById('current-'+activePlayer).textContent = '0';
			movePlayer();

		}

	}

	else{

	}

});

document.querySelector('.btn-hold').addEventListener('click', function () {


	if(gameOn){

		//3. Check if player won the game...


		//1. Add current score to the global/permanent score;

		scores[activePlayer]+=roundScore;
		//2. Update the UI

		document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-score').value;
		if(input != null){

		}
		else {
			input = 100;
		}
		if(scores[activePlayer]>=input){
			//alert('MOre than ten!!!');
			document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
			dry(0);
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			gameOn = 0;

		}
		else{

			movePlayer();
		}

	}

});

document.querySelector('.btn-new').addEventListener('click', init);

function movePlayer() {

	activePlayer ===0 ? activePlayer =1 : activePlayer =0;
	roundScore = 0;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	dry(1);

}