/*---------------------------------------- Button Styles ----------------------------------------*/
const allButtons = document.querySelectorAll("button");
allButtons.forEach(function (currentButton) {
    currentButton.addEventListener('mouseover', buttonOver);
    currentButton.addEventListener('mouseout', buttonOut);
})
function buttonOver() {
    this.style.backgroundColor = '#339989';
}
function buttonOut() {
    this.style.backgroundColor = '#B5FFE9';
}

const game = () => {
    let playerScore = 0;
    let computerScore = 0;
    let moves = 0;

    const playGame = () => {
        const rockBtn = document.querySelector('.wrapper-btn--rock');
        const paperBtn = document.querySelector('.wrapper-btn--paper');
        const scissorBtn = document.querySelector('.wrapper-btn--scissors');
        const playerOptions = [rockBtn,paperBtn,scissorBtn];
        const computerOptions = ['rock','paper','scissors']

        playerOptions.forEach(option => {
            option.addEventListener('click',function(){

                const movesLeft = document.querySelector('.wrapper--moves');
                moves++;
                movesLeft.innerText = `Moves Left: ${3-moves}`;


                const choiceNumber = Math.floor(Math.random()*3);
                const computerChoice = computerOptions[choiceNumber];

                winner(this.id,computerChoice)
                if(moves === 3){
                    gameOver(playerOptions,movesLeft);
                }
            })
        })

    }

    const winner = (player,computer) => {
        const result = document.querySelector('.wrapper--result');
        const playerScoreBoard = document.querySelector('.p-count');
        const computerScoreBoard = document.querySelector('.c-count');

        if(player === computer){
            result.textContent = 'Tie'
        }
        else if(player === 'rock'){
            if(computer === 'paper'){
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;

            }else{
                result.textContent = 'Player Won'
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
        else if(player === 'scissors'){
            if(computer === 'rock'){
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            }else{
                result.textContent = 'Player Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
        else if(player === 'paper'){
            if(computer === 'scissors'){
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            }else{
                result.textContent = 'Player Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
    }

    const gameOver = (playerOptions,movesLeft) => {

        const chooseMove = document.querySelector('.move');
        const result = document.querySelector('.wrapper--result');
        const resetBtn = document.querySelector('.wrapper--reset');

        playerOptions.forEach(option => {
            option.style.display = 'none';
        })

        chooseMove.innerText = 'Game Over!!'
        movesLeft.style.display = 'none';

        if(playerScore > computerScore){
            result.style.fontSize = '2rem';
            result.innerText = 'You Won The Game'
            result.style.color = '#308D46';
        }
        else if(playerScore < computerScore){
            result.style.fontSize = '2rem';
            result.innerText = 'You Lost The Game';
            result.style.color = 'red';
        }
        else{
            result.style.fontSize = '2rem';
            result.innerText = 'Tie';
            result.style.color = 'grey'
        }
        resetBtn.addEventListener('click',() => {
            window.location.reload();
        })
    }
    playGame();
}
game();
