
let iniAmountS = prompt('Enter initial amount of money: ');
let yearNumS = prompt('Enter number of years: ');
let yearPerS = prompt('Enter percentage of a year: ');

if (iniAmountS.match('[0-9]') && yearNumS.match('[0-9]') && yearPerS.match('[0-9]')){
    let iniAmount = Number(iniAmountS);
    let yearNum = Number(yearNumS);
    let yearPer = Number(yearPerS);
    if(iniAmount < 1000 || (yearNum < 1 || !Number.isInteger(yearNum)) || yearPer > 100){
        alert('Invalid input data');
    }
    else {
        let totProfit = calcProfit(iniAmount, yearNum, yearPer);

        alert('Initial amount: ' + iniAmount +  '\n' +
            'Number of years: '  + yearNum +  '\n' +
            'Percentage of a year: ' + yearPer +  '\n' +
            '\n' +
            'Total profit: ' + totProfit.toFixed(2) +  '\n' +
            'Total amount: ' + (iniAmount+ totProfit).toFixed(2) +'\n');
    }
}
else
    alert('Invalid input data');

function calcProfit(amount, iter, percentage) {
    let totProfit = 0;
    let bufAmount = amount;
    for(let i = 0; i<iter; i++) {
        totProfit = amount * percentage / 100;
        amount += totProfit;
    }
    return amount - bufAmount;
}
