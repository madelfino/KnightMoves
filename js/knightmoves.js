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
    pos[start] = 'wb'[randomInt(0,1)] + 'N'
    board.position(pos, false);
    boardElem.find('.square-55d63').removeClass('highlight');
    boardElem.find('.square-' + dest).addClass('highlight');
    minMoves = findMinMoves(start, dest);
    $("#min_moves").text(minMoves);
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

//Use Breadth-first search to find shortest path for knight
function findMinMoves(source, target) {
    if (source == target) return 0;
    function generate_nodes(moves, depth) {
        var nodes = [];
        moves.forEach(function(move) {
            nodes.push([move, depth]);
        });
        return nodes;
    }
    var queue = generate_nodes(generate_moves(source),1);
    while(queue.length > 0) {
        var node = queue.shift();
        if (node[0] == target) return node[1];
        queue = queue.concat(generate_nodes(generate_moves(node[0]),node[1]+1));
    }
}

function onDrop(source, target) {
    if (generate_moves(source).indexOf(target) == -1) {
        alert("Whoops!  That's not a legal move.");
        return 'snapback';
    }
    numMoves++;
    $("#num_moves").text(numMoves);
    var pos = {};
    if (target == dest) {
        setTimeout(function() {
            if (numMoves == minMoves) {
                alert('Great job!');
            } else {
                alert('Good job, but you could have gotten there in fewer moves.');
            }
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
