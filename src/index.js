import React from 'react';
import ReactDOM from 'react-dom';

//map component
import Board from './components/board/board';

//styles
import './components/board/style/board.scss';
import './components/square/style/square.scss';

ReactDOM.render(
    <Board />
  , document.querySelector('.container'));
