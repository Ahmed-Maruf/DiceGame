




var scores, roundScore, activePlayer, gameOn;


function  init() {
	scores = [0,0];
	roundScore = activePlayer = gameOn = 1;

	/*
	document.querySelector('#current-'+activePlayer).textContent = dice;*/

	/*var hold = document.querySelector('#score-0').textContent;*/

	document.querySelector('.dice').style.display = 'none';
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

document.querySelector('.btn-roll').addEventListener('click', function () {


	if(gameOn==1)
	{
		//1. A randon number
		var dice = Math.floor(Math.random()*6)+1;

		var holdDice = document.querySelector('.dice');
		//2. Display the result

		holdDice.style.display = 'block';
		holdDice.src = 'image/dice-' + dice + '.png';

		//3. Update the round score If the rolled number is not a 1!!!
		if(dice>1){
			// Add Score

			roundScore +=dice;
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
		if(scores[activePlayer]>=10){
			//alert('MOre than ten!!!');
			document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			gameOn = 0;
			document.querySelector('')
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
	document.querySelector('.dice').style.display = 'none';

}