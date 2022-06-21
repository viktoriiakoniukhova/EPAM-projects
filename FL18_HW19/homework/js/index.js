const regExp = /[*+-/]/;
const two = 2;

$(document).ready(function () {
    $('button:hover').css({
        'background-color': '#b1dfbb',
        'color': '#fcf8e3'
    });
    $('.digit, .sign').click(function () {
        $('.calc-wrapper-screen--text span').remove()
        $('.calc-wrapper-screen--text').append($(this).text());
    })
    $('.reset').click(function () {
        $('.calc-wrapper-screen--text').text('').append('<span>0</span>');
    })
    $('.sign').click(function () {
        let newScreenText;
        let screenText = $('.calc-wrapper-screen--text').text();
        let lastChar = screenText.charAt(screenText.length-two);
        if(lastChar.match(regExp)){
            newScreenText = screenText.substr(0, screenText.length-two) + $(this).text();
        }else {
            newScreenText = screenText;
        }
        return $('.calc-wrapper-screen--text').text(newScreenText);
    })
    $('.zero').click(function () {
        let screenText = $('.calc-wrapper-screen--text').text();
        let lastChar = screenText.charAt(screenText.length-two);
        let errorMessage = $('<span />').css('color', 'red');
            errorMessage.html('ERROR');
        let newScreenText;
        if(lastChar === '/') {
            newScreenText = $('.calc-wrapper-screen--text').text('').append(errorMessage);
        } else {
            newScreenText = screenText;
        }
        return newScreenText;
    })
    $('.equals').click(function () {
        let logEquation = $('.calc-wrapper-screen--text').text();
        let evalText = evil($('.calc-wrapper-screen--text').text());
        let result = $('.calc-wrapper-screen--text').append(evalText);

        $('.calc-wrapper-screen--text').text('').append(evalText)

        $('.logs-wrapper--log p').text(logEquation + '=' + result.text());
        $('#log')
            .clone()
            .find('p')
            .insertAfter($('#log')).css({'text-align': 'center', 'visibility': 'visible'});
    })
})

function evil(fn) {
    return new Function('return ' + fn)();
}