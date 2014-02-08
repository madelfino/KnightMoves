var board,
    start,
    dest;

function randomInt(min, max) {
    return Math.floor((Math.random()*(max-min+1))+min);
}

function randomSquare() {
    return 'abcdefgh'[randomInt(0,7)] + randomInt(1,8);
}

function restart() {
    start = randomSquare();
    dest = randomSquare();
    while (start == dest) {
        dest = randomSquare();
    }
    var pos = {};
    pos[start] = 'wN'
    board.position(pos, false);
}

var init = function() {
    board = new ChessBoard('board', {
        draggable: true,
        showNotation: false
    });
    restart();

    $('#start').click(function() {
        restart();
    });

}; //end init

$(document).ready(init);
