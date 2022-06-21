// Avoid magic-numbers
const d2000 = 2000, d11 = 11, d20 = 20, d21 = 21;
const d2021 = 2021, d2 = 2, d256 = 256, d2020 = 2020, d2019 = 2019;
const n1000 = 1000, n60 = 60, n24 = 24, n365 = 365, nBig = 1234567890;
// 1. getAge()
const birthday20 = new Date(d2000, d11, d20);
const birthday21 = new Date(d2000, d11, d21);

function getAge(birthdayDate) {
    const year = n1000 * n60 * n60 * n24 * n365;

    let newDate = new Date();
    let subtractDate;
    if (newDate.getMonth() < birthdayDate.getMonth() ||
        newDate.getMonth() === birthdayDate.getMonth() && newDate.getDate() < birthdayDate.getDate()) {
        subtractDate = Math.round((newDate.getTime() - birthdayDate.getTime())/year) - 1;
    } else {
 subtractDate = Math.round((newDate.getTime() - birthdayDate.getTime())/year);
}
    return subtractDate;
}
getAge(birthday20); // 21 (assuming today is the 20th December)
getAge(birthday21); // 20 (assuming today is the 20th December)

// 2. getWeekDay()
function getWeekDay(date) {
    let options = {weekday: 'long'};
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
getWeekDay(Date.now()); // "Monday" (if today is the 20th December)
getWeekDay(new Date(d2021, d11, d21)); // "Tuesday"

// 3. getAmountDaysToNewYear()
function getAmountDaysToNewYear() {
    const day = n1000 * n60 * n60 * n24;
    let currentDate = new Date();
    let newYearDate = new Date(currentDate.getFullYear()+1,0,d2);
    return Math.round((newYearDate.getTime() - currentDate.getTime())/day);
}
getAmountDaysToNewYear(); // 12 (if today is the 20th December)

// 4. getProgrammersDay()
function getProgrammersDay(year) {
    let result = new Date(year, 0, 0);
    result.setDate(result.getDate() + d256);

    let shortMonth = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(result);
    return `${result.getDate()} ${shortMonth}, ${result.getFullYear()} (${getWeekDay(result)})`;
}

getProgrammersDay(d2020); // "12 Sep, 2020 (Saturday)"
getProgrammersDay(d2019); // "13 Sep, 2019 (Friday)"

// 5. howFarIs()
function howFarIs(dayName) {
    let nDayName = dayName[0].toUpperCase() + dayName.slice(1);
    let weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let today = getWeekDay(new Date());
    let index = 0, todayIndex = 0;
    for(let i = 0; i< weekDay.length; i++){
        if(nDayName === weekDay[i]) {
            index = i;
        }
        if(today === weekDay[i]) {
            todayIndex = i;
        }
    }
    if(today === nDayName){
        return `Hey, today is ${today} =)`;
    } else{
        let daysLeft = - todayIndex + index
        return `It's ${ daysLeft } day(s) left till ${ nDayName }`;
    }
}
howFarIs('Tuesday'); // "It's 1 day(s) left till Tuesday." (on December 20nd)
howFarIs('Monday'); // "Hey, today is Monday =)" (on December 20nd)

// 6. isValidIdentifier()
function isValidIdentifier(id) {
    let regExpression = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    return regExpression.test(id);
}
isValidIdentifier('myVar!'); // false
isValidIdentifier('myVar$'); // true
isValidIdentifier('myVar_1'); // true
isValidIdentifier('1_myVar'); // false

//7. capitalize()
function capitalize(str) {
    return str.replace(/\b\w/g, function(c) {
        return c.toUpperCase();
    });
}
const testStr = 'My name is John Smith. I am 27.';
capitalize(testStr); // 'My Name Is John Smith. I Am 27.'

//8. isValidAudioFile()
function isValidAudioFile(str) {
    let regExpression = /^[a-z]*\.(mp3|flac|alac|aac)$/;
    return regExpression.test(str);
}
isValidAudioFile('file.mp4'); // false
isValidAudioFile('my_file.mp3'); // false
isValidAudioFile('file.mp3'); // true

//9. getHexadecimalColors()
function getHexadecimalColors(str) {
    let regExpression = /#([a-f0-9]{3}){1,2}\b/gi;
    if (regExpression.test(str)) {
        return str.match(regExpression);
    } else {
        return [];
    }
}
const testString = 'color: #3f3; background-color: #AA00ef; and: #abcd"'
getHexadecimalColors(testString); // ["#3f3", "#AA00ef"]
getHexadecimalColors('red and #0000'); // [];

//10. isValidPassword()
function isValidPassword(str) {
    let regExpression = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return regExpression.test(str);
}
isValidPassword('agent007'); // false (no uppercase letter)
isValidPassword('AGENT007'); // false (no lowercase letter)
isValidPassword('AgentOOO'); // false (no numbers)
isValidPassword('Age_007'); // false (too short)
isValidPassword('Agent007'); // true

// 11. addThousandsSeparators()
function addThousandsSeparators(num) {
    let regExpression = /\B(?=(\d{3})+(?!\d))/g;
    let strNum = num.toString();
    return strNum.replace(regExpression, ',');
}
addThousandsSeparators('1234567890'); // "1,234,567,890"
addThousandsSeparators(nBig); // "1,234,567,890"

//12. getAllUrlsFromText()
const text1 = 'Hello world https://translate.google.com/ by world https://angular.io/';
const text2 = 'Hello world!';
function getAllUrlsFromText(str) {
    let regExpression = /(http|https|ftp):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])/g;
    try {
        if (str === undefined) {
            throw new Error('error');
        }
        if (regExpression.test(str)) {
            return str.match(regExpression)
        } else {
            return [];
        }
    } catch (e) {
        return console.log(e.message);
    }
}
getAllUrlsFromText(text1); // ["https://translate.google.com/", "https://angular.io/"]
getAllUrlsFromText(text2); // []
getAllUrlsFromText(); // (error)