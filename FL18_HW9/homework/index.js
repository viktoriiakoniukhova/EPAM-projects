/* START TASK 1: Your code goes here */
const table = document.getElementById('table-colors');
table.style.backgroundColor = 'white';

for(let i = 0; i < table.rows.length; i++){
    let row = table.rows[i];
    for(let j = 0; j < table.rows.length; j++){
        let cell = row.cells[j];
        cell.onclick = () => {
            if(cell.cellIndex === 0) {
                table.rows[i].style.backgroundColor = 'blue';
            } else if(cell.innerHTML === 'Special Cell'){
                table.style.backgroundColor = 'green';
            } else{
                cell.style.backgroundColor = 'yellow';
            }
        }
    }
}
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const form = document.getElementById('form');
const input = document.getElementById('input-number');
const button = document.getElementById('btn-send');
const message = document.getElementById('div-message');

const text = input.value;
const regExpression = /^\+380\d{9}$/;

function showError() {
    message.innerHTML = 'Type number doesn\'t follow format +380*********'
    message.style.display = 'block';
    message.style.backgroundColor = 'red';
}
function showSuccess() {
    message.innerHTML = 'Data was successfully sent'
    message.style.display = 'block';
    message.style.backgroundColor = 'green';
}

input.addEventListener('input', ev => {
    if (!regExpression.test(ev.target.value)) {
        showError();
        button.disabled = true;
    } else {
        message.style.display = 'none';
        button.disabled = false;
        }
    }
);

button.addEventListener('click', () => {
    showSuccess();
});
/* END TASK 2 */

/* START TASK 3: Your code goes here */
const court = document.getElementById('court-png');
const ball = document.getElementById('ball-png');

let counterA = 0, counterB = 0;

const scoreZoneA = document.createElement('div');
scoreZoneA.setAttribute('id', 'score-zone-a');

const scoreZoneB = document.createElement('div');
scoreZoneB.setAttribute('id', 'score-zone-b');

document.getElementById('image-stack').append(scoreZoneA,scoreZoneB);

const message1 = document.createElement('div');
message1.setAttribute('id', 'message-1');
message1.display = 'none';
document.getElementById('task3').appendChild(message1);

court.addEventListener('click', ev => {
    findCoords(ev);
})

scoreZoneA.addEventListener('click',(ev) => {
    findCoords(ev);

    counterB ++;
    document.getElementById('team-b').innerHTML = `Team B: ${counterB}`;
    showScore('Team B');
})

scoreZoneB.addEventListener('click',(ev) => {
    findCoords(ev);

    counterA ++;
    document.getElementById('team-a').innerHTML = `Team A: ${counterA}`;
    showScore('Team A');
})

function findCoords(event){
    const parent = document.getElementById('image-stack');
    let parentCoords = parent.getBoundingClientRect();

    ball.style.left = `${event.clientX-parentCoords.left}px`;
    ball.style.top = `${event.clientY-parentCoords.top}px`;
}

function showScore(team) {
    let message = document.getElementById('message-1');
    message.style.fontWeight = 'bold';
    if(team === 'Team B'){
        message.style.color = 'red';
    } else{
        message.style.color = 'blue';
    }
    message.innerHTML = `${team} scored a goal!`;
    message.style.display = 'block'

    const time = 3000;
    setTimeout(function(){
     message.style.display = 'none';
    },time);
}

/* END TASK 3 */
