var board,
    boardElem = $('#board'),
    start = 'a1',
    dest = 'h8',
    numMoves = 0;

function randomInt(min, max) {
    return Math.floor((Math.random()*(max-min+1))+min);
}

function randomSquare() {
    return 'abcdefgh'[randomInt(0,7)] + randomInt(1,8);
}

function restart() {
    numMoves = 0;
    $("#num_moves").text(numMoves);
    start = randomSquare();
    dest = randomSquare();
    while (start == dest) {
        dest = randomSquare();
    }
    var pos = {};
    pos[start] = 'wN'
    board.position(pos, false);
    boardElem.find('.square-55d63').removeClass('highlight');
    boardElem.find('.square-' + dest).addClass('highlight');
}

function onDrop() {
    numMoves++;
    $("#num_moves").text(numMoves);
}

var init = function() {
    board = new ChessBoard('board', {
        draggable: true,
        showNotation: false,
        onDrop: onDrop
    });
    restart();
    $("#num_moves").text(0);
    $('#start').click(function() {
        restart();
    });

}; //end init

$(document).ready(init);
