import React from 'react'
import {Tooltip} from 'antd'
import {GithubOutlined} from '@ant-design/icons'
import './index.css'

const Header: React.FC = props => {
  return (
    <div className="header">
      <a href="https://github.com/ruofee/LogGame" target="_blank" rel="noopener noreferrer">
        <Tooltip defaultVisible title="项目求star✨" color="cyan">
          <div className="header-button">
            <GithubOutlined />
            <span className="header-button-text">Github</span>
          </div>
        </Tooltip>
      </a>
    </div>
  );
}

export default Header