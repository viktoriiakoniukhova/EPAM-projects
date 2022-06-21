let confirmGame = confirm('Do you want to play a game?');
if(!confirmGame)
    alert('You didn\'t become a billionaire, but can.');
else
{
    let  low = 0, high = 8;
    let randNum = Math.floor(Math.random()*(high-low+1) + low);
    let userPrize=0, attempts = 3, playAgain;
    let prize = [100, 50, 25];
    while(true){
        userPrize = playGame(randNum, attempts, userPrize, prize, low, high);
        if(userPrize > 0) {
            let continueGame = confirm('Congratulation, you won! Your prize is:' + userPrize + '$. Do you want to continue?');
            if (!continueGame) {
                alert('Thank you for your participation. Your prize is:' + userPrize + '$');
                playAgain = confirm('Do you want to play again?');
                if(!playAgain) {
                    alert('Thank you for your participation. Bye!');
                    break;
                }
                else {
                    userPrize = playGame(randNum, attempts, userPrize, prize, 0, 8);
                }
            }
            else {
                high +=4;
                randNum = Math.floor(Math.random() * (high - low + 1) + high);
                for(let i = 0; i<prize.length;i++) {
                    prize[i] *= 2;
                }
                userPrize = playGame(randNum, attempts, userPrize, prize, low, high);
                continueGame = confirm('Congratulation, you won! Your prize is:' + userPrize + '$. Do you want to continue?');
            }
        }
        else {
            alert('Thank you for your participation. Your prize is:' + userPrize + '$');
            playAgain = confirm('Do you want to play again?');
            if(!playAgain) {
                alert('Thank you for your participation. Bye!');
                break;
            }
            else
                userPrize = playGame(randNum, attempts, userPrize, prize, low, high);
        }
    }
}

function playGame(randNum, attempts, userPrize, prize, low, high) {
        let userNum;
        for (let i = 0; attempts > 0;i ++) {
            userNum = Number(prompt('Choose a roulette pocket number from ' + low + ' to ' + high +
                '\nAttempts left: ' + attempts +
                '\nTotal prize: ' + userPrize +
                '\nPossible prize on current attempt: ' + prize[i]+
                '\nEnter a number of pocket'));
            switch (attempts) {
                case 3:
                    if (userNum === randNum) {userPrize += prize[0]; return userPrize;}
                    else attempts--;
                    break;
                case 2:
                    if (userNum === randNum) {userPrize += prize[1]; return userPrize;}
                    else attempts--;
                    break;
                case 1:
                    if (userNum === randNum) {userPrize += prize[2]; return userPrize;}
                    else attempts--;
                    break;
            }
        }
        return userPrize;
}