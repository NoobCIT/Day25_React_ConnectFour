import React, { Component } from 'react';

function Row(props) {
  return (
    <tr>
      {props.row.map( (square, i) => <Square key={i} value={square} columnIndex={i} play={props.play} />) }
    </tr>
  )
}

function Square(props) {
  let color = 'empty';
  if (props.value === 1) {
    color = 'red';
  } else if (props.value === 2) {
    color = 'blue';
  }
  return (
    <td>
      <div className='square' onClick={ () => {props.play(props.columnIndex)} }>
        <div className={color}></div>
      </div>
    </td>
  )
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      board: [],
      gameOver: false,
      status: '',
    }

    this.play = this.play.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  initializeBoard() {
    let board = [];
    for (let row = 0; row < 6; row++) {
      let currentRow = [];
      for (let col = 0; col < 7; col++) {
        currentRow.push(null);
      }
      board.push(currentRow);
    }
    this.setState({
      currentPlayer: this.state.player1,
      board: board,
      gameOver: false,
      status: 'Game in Progress',
    });
  }

  play(col) {
    if (!this.state.gameOver) {
      let board = this.state.board;
      for (let row = 5; row >= 0; row--) {
        if (board[row][col] === null) {
          board[row][col] = this.state.currentPlayer;
          break;
        }
      }

      let result = this.checkBoard(board);
      if (result === this.state.player1) {
        this.setState({
          board: board,
          gameOver: true,
          status: 'Player 1 (Red) wins',
        });
      } else if (result === this.state.player2) {
        this.setState({
          board: board,
          gameOver: true,
          status: 'Player 2 (Blue) wins',
        });
      } else if (result === 'draw') {
        this.setState({
          board: board,
          gameOver: true,
          status: 'Game is a draw',
        });
      } else {
        this.setState({
          board: board,
          currentPlayer: this.togglePlayer(),
        });
      }
    } else {
      this.setState({
        status: 'Gameover, start a new game',
      });
    }
  }

  checkBoard(board) {
    return this.checkVertical(board)
      || this.checkHorizontal(board)
      || this.checkDiagonals(board)
      || this.checkDraw(board)
  }

  checkVertical(board) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row + 1][col] &&
              board[row][col] === board[row + 2][col] &&
              board[row][col] === board[row + 3][col]) {
                return board[row][col];
          }
        }
      }
    }
  }

  checkHorizontal(board) {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row][col + 1] &&
              board[row][col] === board[row][col + 2] &&
              board[row][col] === board[row][col + 3]) {
                return board[row][col];
          }
        }
      }
    }
  }

  checkDiagonals(board) {
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row - 1][col + 1] &&
              board[row][col] === board[row - 2][col + 2] &&
              board[row][col] === board[row - 3][col + 3]) {
                return board[row][col];
          }
        }
      }
    }
    for (let row = 3; row < 6; row++) {
      for (let col = 6; col > 2; col--) {
        if (board[row][col]) {
          if (board[row][col] === board[row - 1][col - 1] &&
              board[row][col] === board[row - 2][col - 2] &&
              board[row][col] === board[row - 3][col - 3]) {
                return board[row][col];
          }
        }
      }
    }
  }

  checkDraw(board) {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col] === null) {
          return null;
        }
      }
    }
    return 'draw';
  }

  togglePlayer() {
    return this.state.currentPlayer === this.state.player1
      ? this.state.player2 : this.state.player1
  }

  handleClick() {
    this.initializeBoard();
  }

  componentDidMount() {
    this.initializeBoard();
  }

  render() {
    return (
      <div>
        <div className='newGame'>
          <button onClick={this.handleClick}>New Game</button>
        </div>
        <table>
          <tbody>
            {this.state.board.map( (row, i) => <Row row={row} key={i} play={this.play} />) }
          </tbody>
        </table>
        <p className="status">{this.state.status}</p>
      </div>
    );
  }
}

export default App;
