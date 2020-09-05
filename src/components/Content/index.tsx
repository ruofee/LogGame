import React from 'react'
import {Typography, Divider, Button} from 'antd'
import LogGame from '../../game'
import './index.css';
const {Title, Paragraph, Text} = Typography

const Emoji: React.FC<{content: string}> = props => {
  return <span className="emoji" role="img" aria-label={props.content}>{props.content}</span>
}

// 加载控制台游戏
const emoji = ['🚘', '🚀', '🏃']
const logGame = new LogGame()
console.log('点击屏幕中的“开始”按钮开始游戏 🚘 🚀 🏃')
const start = (): void => {
  logGame.start()
}

const Content: React.FC = props => {
  return (
    <div className="content">
      <div className="title">
        <Title>
          LogGame
        </Title>
        <Paragraph>
          作者: <a className="app-link" href="https://github.com/ruofee" target="_blank" rel="noopener noreferrer">Ruofee</a>
        </Paragraph>
        <div className="title-button">
          <Button type="primary" onClick={start}>开始游戏</Button>
        </div>
      </div>
      <Divider orientation="left">游戏介绍</Divider>
      <Paragraph>
        藏在浏览器控制台里的小游戏
        {
          emoji.map((item: string, index: number) => <Emoji content={item} key={`emoji_${index}`}></Emoji>)
        }
      </Paragraph>
      <Divider orientation="left">如何使用</Divider>
      <Paragraph>
        目前为游戏Demo，可在该网站进行体验，步骤如下：
      </Paragraph>
      <Paragraph>
        推荐火狐浏览器和谷歌浏览器，若无法控制小车移动，请重新点击屏幕获取焦点
      </Paragraph>
      <Paragraph>
        <ul>
          <li>
            <p>打开控制台：按<Text code>F12</Text>或<Text code>右键-检查</Text>，切换到<Text code>控制台</Text></p>
            <img className="App-img" src="/step1.png" alt="步骤1"/>
            <img className="App-img" src="/step2.png" alt="步骤2"/>
          </li>
          <li>
            <p>游戏规则：通过键盘中的<Text code>上、下、左、右</Text>按键控制小车移动，躲避障碍物，每躲过一个障碍物得<Text code>1分</Text>，碰撞障碍物时则游戏结束</p>
          </li>
          <li>
            <span>快点击下方的<Text code>开始游戏</Text>按钮进入游戏吧!</span>
            <div className="button-wrap">
              <Button type="primary" onClick={start} disabled={logGame.game.status === 1}>开始游戏</Button>
            </div>
          </li>
        </ul>
      </Paragraph>
    </div>
  );
}

export default Content