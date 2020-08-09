import React from 'react';
import './App.css';
import LogGame from './game';

const logGame = new LogGame()

function App() {
  const start = (): void => {
    logGame.start()
  }
  return (
    <div className="App">
      <p>请按F12(或是右键-检查)打开控制台, 点击下方按钮开始游戏</p>
      <p><button onClick={start} disabled={logGame.game.status === 1}>开始游戏</button></p>
    </div>
  );
}

export default App;
