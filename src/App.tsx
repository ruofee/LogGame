import React from 'react'
import './App.css'
import LogGame from './game'
import car from './game/material/car'

// 加载控制台游戏
const logGame = new LogGame()
console.log('点击屏幕中的“开始”按钮开始游戏 🚘🚀🏃')

const Emoji: React.FC<{content: string}> = props => {
  return <span role="img" aria-label={props.content}>{props.content}</span>
}

const emoji = ['🚘', '🚀', '🏃']

function App() {
    let value: string = car;
    const start = (): void => {
        logGame.start(value)
    }
    function onChang(event:any) {
        value = event.target.value;
    }
  return (
    <div className="App">
      <h1>LogGame --- 藏在浏览器控制台里的小游戏 {emoji.map((item: string, index: number) => <Emoji content={item} key={`emoji_${index}`}></Emoji>)}</h1>
      <h3>目前为游戏Demo，可在该网站进行体验，步骤如下：</h3>
      <h5>Tip：推荐火狐浏览器和谷歌浏览器，若无法控制小车移动，请重新点击屏幕获取焦点</h5>
      <ul>
        <li>
          <p>打开控制台：按F12或右键-检查，切换到“控制台”</p>
          <img className="App-img" src="/step1.png" alt="步骤1"/>
          <img className="App-img" src="/step2.png" alt="步骤2"/>
        </li>
        <li>
          <p>游戏规则：通过键盘中的上、下、左、右按键控制小车移动，躲避障碍物，每躲过一个障碍物得1分，碰撞障碍物时失败</p>
        </li>
        <li>
            <p>自定义汽车样式 </p>
            <textarea defaultValue={value} onChange={onChang}/>
        </li>
        <li>
          <span>点击下方的“开始”按钮，开始游戏</span>
          <p><button onClick={start} disabled={logGame.game.status === 1} className="btn">开始游戏</button></p>
        </li>
      </ul>
    </div>
  )
}

export default App
