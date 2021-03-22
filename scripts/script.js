const chess = new Chess();
var engine = STOCKFISH();

let board = document.getElementsByClassName('square');

chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

update_board();

engine.postMessage('uci');
engine.postMessage('isready');
engine.postMessage('ucinewgame');
engine.postMessage('setoption name Skill Level value 10')
engine.postMessage('setoption name Skill Level Maximum Error value 1')
engine.postMessage('setoption name Skill Level Probability Value 10')

engine.onmessage = function(event) {
    // const move = event.match;
    if (event.split(' ')[0] === "bestmove") {
        console.log(event.split(' ')[1])
        chess.move(event.split(' ')[1], {"sloppy": true});
        update_board();
    }
}

function getBestStockfishMove() {
    engine.postMessage('position fen ' + chess.fen());
    engine.postMessage('go depth 3');
}

function update_board() {
    for (let i in chess.board()) {
        for (let j in chess.board()[i]) {
            if (board[(i*8)+parseInt(j)].firstChild != null) {
                board[(i*8)+parseInt(j)].removeChild(board[(i*8)+parseInt(j)].firstChild);
            }
            cp = chess.board()[i][j]
            if (cp != null) {
                switch(cp.type) {
                    case "b":
                        if (cp.color === "w") {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece bishop white\"></div>"
                        } else {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece bishop black\"></div>"
                        }
                        break;
                    case "k":
                        if (cp.color === "w") {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece king white\"></div>"
                        } else {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece king black\"></div>"
                        }
                        break;
                    case "n":
                        if (cp.color === "w") {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece knight white\"></div>"
                        } else {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece knight black\"></div>"
                        }
                        break;
                    case "p":
                        if (cp.color === "w") {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece pawn white\"></div>"
                        } else {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece pawn black\"></div>"
                        }
                        break;
                    case "q":
                        if (cp.color === "w") {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece queen white\"></div>"
                        } else {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece queen black\"></div>"
                        }
                        break;
                    case "r":
                        if (cp.color === "w") {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece rook white\"></div>"
                        } else {
                            board[(i*8)+parseInt(j)].innerHTML = "<div class=\"piece rook black\"></div>"
                        }
                        break;
                }
            }
        }
    }
}

const timer = ms => new Promise(res => setTimeout(res, ms))

async function main() {
    while (!chess.game_over()) {
        getBestStockfishMove();
        await timer(500);
    }
}

// function on_square_click(context) {
//     let squares = Array.prototype.slice.call(document.getElementsByClassName("square"));
//     if (context.firstChild) {
//         squares.forEach(element => {
//             element.classList.remove("selected");
//             context.classList.add("selected");
//         });
//     }
// }