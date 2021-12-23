
let square = {

    a1: '',  a2: '',  a3: '',
    b1: '',  b2: '',  b3: '',
    c1: '',  c2: '',  c3: '',
};

let player  = '';
let warning = '';
let playing = false;

reset();


document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {

    item.addEventListener('click', itemClick);

});

function itemClick(event) {

    let item = event.target.getAttribute('data-item');

    
    if (playing && square[item] === '') {

        square[item] = player;
        renderSquare();
        togglePlayer();
    }

}

/**
 * Função que vai resetar o quadro
 */
function reset() {

    warning = '';

    let random = Math.floor(Math.random() * 2);

    player = random === 0 ? 'X' : 'O';

    for (let i in square) {

        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

/**
 * Renderiza o jogo
 */
function renderSquare() {

    for (let i in square) {

        let item = document.querySelector(`div[data-item=${ i }]`);
        item.innerHTML = square[i];
    }

    checkGame();
}

/**
 * Renderiza as informaçẽs
 */
function renderInfo() {

    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;

}

/**
 * Alterna os Players 
 */
function togglePlayer() {

    player = (player === 'X') ? 'O' : 'X';
    renderInfo();

}

/**
 * Verifica quem Ganhou
 */
function checkGame() {

    if (checkWinnerfor('X')) {

        warning = 'O "X" Ganhou!!';
        playing = false;
    
    } else if (checkWinnerfor('O')) {

        warning = 'O "O" Ganhou!!';
        playing = false;

    } else if (isFull()) {
        
        warning = 'Empate'
        playing = false;

    }

}

/**
 * Verifica qual player foi o vencedor
 * @param {*} player 
 */
function checkWinnerfor(player) {

    let position = [

        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
    
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
    
        'a1,b2,c3',
        'a3,b2,c1',
    ];

    //Array quega as positção pega cada uma dela ex:. a1 a2 etc...
    for (let k in position) {
        
        let kArray = position[k].split(',');

        //faz verificação em cada array, e verifica se foi satisfeito.
        let hasWon = kArray.every( options => square[options] === player );

        if (hasWon) {

            return true;
        }
    }

    return false;

}

/**
 * Verifica se o quadro esta cheio e retorna empate:
 */
function isFull() {

    for (let i in square) {

        if (square[i] === '') {
            
            return false;
        }
    }

    return true;
}
