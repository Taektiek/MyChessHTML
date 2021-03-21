const chess = new Chess();
const engine = new Worker('scripts/stockfish.js')

let board = document.getElementsByClassName('square');

chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

update_board();

// engine.postMessage("uci");
// engine.postMessage("ucinewgame");
// engine.postMessage("isready");
// engine.postMessage("pos " + chess.fen() + " moves");
// engine.postMessage("go depth 3");
// engine.postMessage("bestmove");

// engine.onmessage = function(event) {
//     console.log(event.data);
// }

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
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        console.log(move);
        chess.move(move);
        update_board();
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