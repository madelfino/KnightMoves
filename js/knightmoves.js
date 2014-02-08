var init = function() {

var board;

var cfg = {
    draggable: true,
    showNotation: false
};

board = new ChessBoard('board', cfg)

}; //end init

$(document).ready(init);
