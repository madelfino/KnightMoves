var board,
    boardElem = $('#board'),
    start = 'a1',
    cur = 'a1',
    dest = 'h8',
    numMoves = 0,
    minMoves = 1;

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
    cur = start;
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

function generate_moves(square) {
    function rowColToSquare(r, c) {
        if (r < 0 || r > 7 || c < 0 || c > 7) return 'invalid';
        return 'abcdefgh'[c] + (r+1);
    }
    function pushIfValid(list, item) {
        if (item != 'invalid') list.push(item);
        return list;
    }
    var row = parseInt(square[1]) - 1,
        col = 'abcdefgh'.indexOf(square[0]),
        moves = [];
    pushIfValid(moves, rowColToSquare(row-2,col-1));
    pushIfValid(moves, rowColToSquare(row-1,col-2));
    pushIfValid(moves, rowColToSquare(row+2,col-1));
    pushIfValid(moves, rowColToSquare(row+1,col-2));
    pushIfValid(moves, rowColToSquare(row+2,col+1));
    pushIfValid(moves, rowColToSquare(row+1,col+2));
    pushIfValid(moves, rowColToSquare(row-2,col+1));
    pushIfValid(moves, rowColToSquare(row-1,col+2));
    return moves;
}

function onDrop(source, target) {
    if (generate_moves(source).indexOf(target) == -1) return 'snapback';
    numMoves++;
    $("#num_moves").text(numMoves);
    var pos = {};
    if (target == dest) {
        setTimeout(function() {
            //if (numMoves == minMoves) {
                alert('Great job!');
            //} else {
                //alert('Good job, but you could have gotten there in fewer moves.');
            //}
            restart();
        }, 100);
    }
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
