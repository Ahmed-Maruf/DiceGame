/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scoreManager = {
	scores:[0,0],
	activePlayer:0,
	roundScore:0,
	finalScore:50,
	playerOneScore:	document.getElementById("score-0"),
	playerTwoScore:	document.getElementById("score-1"),
	playerOneCurrentScore:	document.getElementById("current-0"),
	playerTwoCurrentScore: 	document.getElementById("current-1"),
	playerOneName:	document.getElementById('name-0'),
	playerTwoName: document.getElementById('name-1'),
	dice:document.querySelector('.dice'),
	init(){
		this.scores = [0, 0];
		this.activePlayer = 0;
		this.roundScore = 0;
		this.playerOneScore.textContent = 0;
		this.playerTwoScore.textContent = 0;
		this.playerOneCurrentScore.textContent = 0;
		this.playerTwoCurrentScore.textContent = 0;
		this.playerOneName.textContent = 'Player-1';
		this.playerTwoName.textContent = 'Player-2';
		this.dice.style.display = 'none';
		document.querySelector(`.player-0-panel`).classList.remove('winner');
		document.querySelector(`.player-1-panel`).classList.remove('winner');
		document.querySelector(`.player-0-panel`).classList.remove('active');
		document.querySelector(`.player-1-panel`).classList.remove('active');
		document.querySelector(`.player-0-panel`).classList.add('active');
	},
	nextPlayer(){
		this.roundScore = 0;
		this.activePlayer ? this.playerTwoCurrentScore.textContent = this.roundScore : this.playerOneCurrentScore.textContent = this.roundScore;
		document.querySelector(`.player-${this.activePlayer}-panel`).classList.remove('active');
		this.activePlayer = this.activePlayer === 0 ? 1 : 0;
		document.querySelector(`.player-${this.activePlayer}-panel`).classList.add('active');
		document.querySelector('.dice').style.display = 'none';
	}
};scoreManager.init();

document.querySelector('.btn-roll').addEventListener('click', function (event) {
	// 1. Random Number
	let dice = Math.floor(Math.random() * 6) + 1;

	// 2. Display the result
	this.dice.style.display = 'block';

	// 3. Change the dice with generated number
	this.dice.src = `dice-${dice}.png`;

	// 3. Updateh round score if the rolled number !=1
	if (dice != 1) {
		this.roundScore += dice;
		this.activePlayer ? this.playerTwoCurrentScore.textContent = this.roundScore : this.playerOneCurrentScore.textContent = this.roundScore
	} else {
		this.nextPlayer();
	}
}.bind(scoreManager),false);

// Update the total score on click to btn-hold on each round and decide winner
document.querySelector('.btn-hold').addEventListener('click', function (event) {
	this.scores[this.activePlayer] += this.roundScore;
	this.activePlayer ? this.playerTwoScore.textContent = this.scores[this.activePlayer] : this.playerOneScore.textContent = this.scores[this.activePlayer];
	if (this.scores[this.activePlayer] >= this.finalScore) {
		this.activePlayer ? this.playerTwoName.textContent = "Winner!" : this.playerOneName.textContent = "Winner!";
		document.querySelector(`.player-${this.activePlayer}-panel`).classList.add('winner');
		document.querySelector(`.player-${this.activePlayer}-panel`).classList.remove('active');
	} else {
		this.nextPlayer();
	}
}.bind(scoreManager),false);


document.querySelector('.btn-new').addEventListener('click', function (event) {
	this.init();
	this.finalScore = document.querySelector('.final-score').value !=0 ? document.querySelector('.final-score').value : this.finalScore;

}.bind(scoreManager),false);