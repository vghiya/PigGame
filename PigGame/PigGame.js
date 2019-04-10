/*
GAME RULES:

- The game has 2 players who are playing in rounds
- In each turn, a player rolls a dice as many times as he/she wishes and their current results will get added to their ROUND score. 
- BUT as soon as the dice shows 1, the player's entire round score is back to 0 again and it is the next player's turn.
- The player can choose to 'Hold', which means that their ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore;
var activePlayer;
var gameStillOn;
var winningScore;


startGame();


document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gameStillOn) {
        // 1. Generate random munber. 
        //math.random - provides us with random numbers between 0 and 1. while math.floor(any number) gives us only the integer value of the number. 
        var dice = Math.floor(Math.random() * 6) + 1;  //multiply with 6 so that we can get numbers between 0 to 5 and then add 1 as we dont want 0 and we want 6 too. and only this functtion will have the access to the dice variable. 
        

        // 2. Display the results. 
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'Images/dice-' + dice + '.png';

        // 3. Update the round score ONLY IF the rolled number is not equal to 1
        if (dice !== 1) {
            // Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player 
            nextPlayer();
            document.querySelector('.dice').style.display = 'none';
        }
    } 
}); //anonumous function. we dont need to call the same function from elsewhere so we write the function inside the event listner function itself. 

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gameStillOn) {
        // Add the current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        console.log(input);
        

        // undefined , 0, null or '' are coerced to false
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }
        
        // Check is player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameStillOn = false;

        } else {
            // Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //ternary operator: (condition)? if-true-then-what : else-what;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //remove and add class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', startGame);

function startGame() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gameStillOn = true;

    //"queryselector('#ID_of the element')" select the element with that id. 

    document.querySelector('.dice').style.display = 'none';  //so that dice is not visible at start

    //getElementById is another way to select the elements using their id. 

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector(".final-score").value = "";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    
}













