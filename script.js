let rate = [];
// let isGameStopped = false;


document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('theme') == null)
    localStorage.setItem('theme', 'light')

  const themeSwitcher = document.querySelectorAll('#theme-switcher');

  themeSwitcher.forEach(function (element) {
    element.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  })
  if (localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark');
  }
  document.getElementById("play").addEventListener("click", () => {
    const grid = document.createElement("div");
    grid.classList.add("grid")
    document.querySelector("#playfield .field").appendChild(grid);
    play();
    document.getElementById("menu").classList.add('hidden');
    setTimeout(() => {
      document.getElementById("menu").style.display = 'none';
      document.getElementById("playfield").style.display = 'flex';
      setTimeout(() => {
        document.getElementById("playfield").classList.remove('hidden');
      }, 100);
    }, 300);
  });

  document.getElementById("open-settings").addEventListener("click", () => {
    document.getElementById("menu").classList.add('hidden');
    setTimeout(() => {
      document.getElementById("menu").style.display = 'none';
      document.getElementById("settings").style.display = 'flex';
      setTimeout(() => {
        document.getElementById("settings").classList.remove('hidden');
      }, 100);
    }, 300);
  });

  document.getElementById("plus1").addEventListener("click", () => {
    let speed = parseInt(localStorage.getItem("speed") || 600);
    if(speed == 1500){
      return;
    }
    localStorage.setItem("speed", speed + 150);
    document.getElementById("speedMinus").textContent = speed + 150;
  });

  document.getElementById("minus2").addEventListener("click", () => {
    let speed = parseInt(localStorage.getItem("speed") || 600);
    if(speed == 0){
      return;
    }
    localStorage.setItem("speed", speed - 150);
    document.getElementById("speedMinus").textContent = speed - 150;
  });

  document.getElementById("speedMinus").textContent = localStorage.getItem("speed") || 600;

  document.getElementById("open-rate").addEventListener("click", () => {
    document.getElementById("menu").classList.add('hidden');
    setTimeout(() => {
      document.getElementById("menu").style.display = 'none';
      document.getElementById("rate").style.display = 'flex';
      setTimeout(() => {
        document.getElementById("rate").classList.remove('hidden');
      }, 100);
    }, 300);
  });

  Array.from(document.getElementsByClassName("open-menu")).forEach((el) => {
    el.addEventListener("click", () => {
      document.getElementById("playfield").classList.add('hidden');
      document.getElementById("settings").classList.add('hidden');
      document.getElementById("rate").classList.add('hidden');
      setTimeout(() => {
        document.getElementById("playfield").style.display = 'none';
        if (document.querySelector(".grid")) {
          document.querySelector(".grid").remove();
        }
        document.getElementById("settings").style.display = 'none';
        document.getElementById("rate").style.display = 'none';
        document.getElementById("menu").style.display = 'flex';
        setTimeout(() => {
          document.getElementById("menu").classList.remove('hidden');
        }, 100);
      }, 300);
    });
  });
});

function play() {
  const PLAYFIELD_COLUMNS = 10;
  const PLAYFIELD_ROWS = 20;

  const grid = document.querySelector(".grid");

  for (let i = 0; i < PLAYFIELD_COLUMNS * PLAYFIELD_ROWS; i++)
    grid.appendChild(document.createElement("div"));

  grid.style.grid = `repeat(${PLAYFIELD_ROWS}, auto) / repeat(${PLAYFIELD_COLUMNS}, auto)`;
  grid.style.userSelect = 'none';

  let score = 0, lines = 0;
  const TETROMINO_NAMES = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
  const TETROMINOES = {
    'I': [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    'J': [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    'L': [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    'O': [
      [1, 1],
      [1, 1],
    ],
    'S': [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    'Z': [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    'T': [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]
  };

  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function rotateMatrix(matrix) {
    const N = matrix.length;
    const rotatedMatrix = [];
    for (let i = 0; i < N; i++) {
      rotatedMatrix[i] = [];
      for (let j = 0; j < N; j++) {
        rotatedMatrix[i][j] = matrix[N - j - 1][i];
      }
    }
    return rotatedMatrix;
  }

  function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
  }

  const SAD = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0]
  ];

  class Tetris {
    constructor() {
      this.playfield;
      this.tetromino;
      this.isGameOver = false;
      this.init();
    }

    init() {
      this.generatePlayfield();
      this.generateTetromino();
    }

    generatePlayfield() {
      this.playfield = new Array(PLAYFIELD_ROWS).fill()
        .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
    }

    generateTetromino() {
      const name = getRandomElement(TETROMINO_NAMES);
      const matrix = TETROMINOES[name];

      const column = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
      const row = -2;

      this.tetromino = {
        name,
        matrix,
        row,
        column,
        ghostColumn: column,
        ghostRow: row,
      };

      this.calculateGhostPosition();
    }

    moveTetrominoDown() {
      this.tetromino.row += 1;
      if (!this.isValid()) {
        this.tetromino.row -= 1;
        this.placeTetromino();
      }
    }

    moveTetrominoLeft() {
      this.tetromino.column -= 1;
      if (!this.isValid()) {
        this.tetromino.column += 1;
      } else {
        this.calculateGhostPosition();
      }
    }

    moveTetrominoRight() {
      this.tetromino.column += 1;
      if (!this.isValid()) {
        this.tetromino.column -= 1;
      } else {
        this.calculateGhostPosition();
      }
    }

    rotateTetromino() {
      const oldMatrix = this.tetromino.matrix;
      const rotatedMatrix = rotateMatrix(this.tetromino.matrix);
      this.tetromino.matrix = rotatedMatrix;
      if (!this.isValid()) {
        this.tetromino.matrix = oldMatrix;
      } else {
        this.calculateGhostPosition();
      }
    }

    dropTetrominoDown() {
      this.tetromino.row = this.tetromino.ghostRow;
      this.placeTetromino();
    }

    isValid() {
      const matrixSize = this.tetromino.matrix.length;
      for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
          if (!this.tetromino.matrix[row][column]) continue;
          if (this.isOutsideOfGameBoard(row, column)) return false;
          if (this.isCollides(row, column)) return false;
        }
      }
      return true;
    }

    isOutsideOfGameBoard(row, column) {
      return this.tetromino.column + column < 0 ||
        this.tetromino.column + column >= PLAYFIELD_COLUMNS ||
        this.tetromino.row + row >= this.playfield.length;
    }

    isCollides(row, column) {
      return this.playfield[this.tetromino.row + row]?.[this.tetromino.column + column];
    }

    placeTetromino() {
      const matrixSize = this.tetromino.matrix.length;
      for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
          if (!this.tetromino.matrix[row][column]) continue;
          if (this.isOutsideOfTopBoard(row)) {
            this.isGameOver = true;
            if (rate.length < 5) {
              rate.push({ points: score, line: lines });
              rate.sort((a, b) => b.line - a.line);
              rate.reverse();
            }
            else {
              rate.push({ points: score, line: lines });
              rate.sort((a, b) => b.line - a.line);
              rate.reverse();
              rate.pop;
            }
            for (let i = 0; i < rate.length; ++i) {
              console.log(rate[i]);
            }
            document.querySelector("table tbody").innerHTML = "";
            for (let j = rate.length - 1, i = 1; j >= 0; ++i, --j) {
              if (j === rate.length - 6) {
                break;
              }
              let row = document.createElement("tr");
              let col1 = document.createElement("td");
              let col2 = document.createElement("td");
              let col3 = document.createElement("td");
              // let col4 = document.createElement("td");
              col1.textContent = i;
              col2.textContent = rate[j].points;
              col3.textContent = rate[j].line;
              // if (rate[j].line >= 10 && rate[j].line % 10 == 0) {
              //   col4.textContent = rate[j].line / 10;
              // }
              // else {
              //   col4.textContent = 0;
              // }
              row.appendChild(col1);
              row.appendChild(col2);
              row.appendChild(col3);
              // row.appendChild(col4);
              document.querySelector("table tbody").appendChild(row);
            }
            document.getElementById("score").textContent = 0;
            document.getElementById("lines").textContent = 0;
            // document.getElementById("level").textContent = 0;
            return;
          }

          this.playfield[this.tetromino.row + row][this.tetromino.column + column] = this.tetromino.name;
        }
      }

      this.processFilledRows();
      this.generateTetromino();
    }

    isOutsideOfTopBoard(row) {
      return this.tetromino.row + row < 0;
    }

    processFilledRows() {
      const filledLines = this.findFilledRows();
      this.removeFilledRows(filledLines);
    }

    findFilledRows() {
      const filledRows = [];
      for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        if (this.playfield[row].every(cell => Boolean(cell))) {
          filledRows.push(row);
        }
      }
      lines += filledRows.length;
      score += filledRows.length * 100;

      // if (lines % 10 === 0 && lines > 0) {
      //   level++;
      // }

      document.getElementById("score").textContent = score;
      document.getElementById("lines").textContent = lines;
      // document.getElementById("level").textContent = level;
      return filledRows;
    };

    removeFilledRows(filledRows) {
      filledRows.forEach(row => {
        this.dropRowsAbove(row);
      });
    }
    dropRowsAbove(rowToDelete) {
      for (let row = rowToDelete; row > 0; row--) {
        this.playfield[row] = this.playfield[row - 1];
      }
      this.playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
    }

    calculateGhostPosition() {
      const tetrominoRow = this.tetromino.row;
      this.tetromino.row++;
      while (this.isValid()) {
        this.tetromino.row++;
      }
      this.tetromino.ghostRow = this.tetromino.row - 1;
      this.tetromino.ghostColumn = this.tetromino.column;
      this.tetromino.row = tetrominoRow;
    }
  }

  let requestId;
  let timeoutId;
  const tetris = new Tetris();
  const cells = document.querySelectorAll('.grid>div');

  initKeydown();
  initTouch();

  moveDown();

  function initKeydown() {
    document.addEventListener('keydown', onKeydown);
  }

  function onKeydown(event) {
    switch (event.key) {
      case 'ArrowUp':
        rotate();
        break;
      case 'ArrowDown':
        moveDown()
        break;
      case 'ArrowLeft':
        moveLeft()
        break;
      case 'ArrowRight':
        moveRight();
        break;
      case ' ':
        dropDown();
        break;
      default:
        return;
    }
  }

  function initTouch() {
    document.addEventListener('dblclick', (event) => {
      event.preventDefault();
    });
  };

  function moveDown() {
    tetris.moveTetrominoDown();
    draw();
    stopLoop();
    startLoop();

    if (tetris.isGameOver) {
      gameOver();
    }
  }

  function moveLeft() {
    tetris.moveTetrominoLeft();
    draw();
  }

  function moveRight() {
    tetris.moveTetrominoRight();
    draw();
  }

  function rotate() {
    tetris.rotateTetromino();
    draw();
  }

  function dropDown() {
    tetris.dropTetrominoDown();
    draw();
    stopLoop();
    startLoop();

    if (tetris.isGameOver) {
      gameOver();
    }
  }

  function startLoop() {
    timeoutId = setTimeout(() => requestId = requestAnimationFrame(moveDown), parseInt(localStorage.getItem("speed") || 600));
  }

  function stopLoop() {
    cancelAnimationFrame(requestId);
    clearTimeout(timeoutId);
  }

  // function toggleGameState() {
  //   if (isGameStopped) {
  //     startLoop();
  //     dropDown();
  //     isGameStopped = false;
  //   } else {
  //     stopLoop();
  //     isGameStopped = true;
  //   }
  // }

  // document.getElementById('stop-game').addEventListener('click', function() {
  //   toggleGameState();
  //  });

  function draw() {
    cells.forEach(cell => cell.removeAttribute('class'));
    drawPlayfield();
    drawTetromino();
  }

  function drawPlayfield() {
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
      for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
        if (!tetris.playfield[row][column]) continue;
        const name = tetris.playfield[row][column];
        const cellIndex = convertPositionToIndex(row, column);
        cells[cellIndex].classList.add(name);
      }
    }
  }

  function drawTetromino() {
    const name = tetris.tetromino.name;
    const tetrominoMatrixSize = tetris.tetromino.matrix.length;
    for (let row = 0; row < tetrominoMatrixSize; row++) {
      for (let column = 0; column < tetrominoMatrixSize; column++) {
        if (!tetris.tetromino.matrix[row][column]) continue;
        if (tetris.tetromino.row + row < 0) continue;
        const cellIndex = convertPositionToIndex(tetris.tetromino.row + row, tetris.tetromino.column + column);
        cells[cellIndex].classList.add(name);
      }
    }
  }

  function gameOver() {
    stopLoop();
    document.removeEventListener('keydown', onKeydown);
    gameOverAnimation();
  }

  function gameOverAnimation() {
    const filledCells = [...cells].filter(cell => cell.classList.length > 0);
    filledCells.forEach((cell, i) => {
      setTimeout(() => cell.classList.add('hide'), i * 10);
      setTimeout(() => cell.removeAttribute('class'), i * 10 + 500);
    });

    setTimeout(drawSad, filledCells.length * 10 + 1000);
  }

  function drawSad() {
    const TOP_OFFSET = 0;
    for (let row = 0; row < SAD.length; row++) {
      for (let column = 0; column < SAD[0].length; column++) {
        if (!SAD[row][column]) continue;
        const cellIndex = convertPositionToIndex(TOP_OFFSET + row, column);
        cells[cellIndex].classList.add('sad');
      }
    }
  }
}