import React, { useState, FC } from 'react'
import { createPortal } from 'react-dom'

import './index.scss'
import BoardModal from '@/Components/BoardModal'

interface positionType {
  left: number,
  top: number
}

interface PropsType {
  show: boolean
  value: string
  onClose: () => void
  position?: positionType // 控制弹窗内容方向
}

const Index: FC<PropsType> = ({ show, value, onClose, position = { left: 0, top: 0 } }) => {
  const { left, top } = position
  const style = {
    left: `${left}px`,
    top: `${top}px`
  }
  return <BoardModal show={show} onClose={onClose}>
    <div className='pc-edit-card-modal' style ={style}>
      <textarea defaultValue={value}/>
      <ul>
        <li>打开卡片</li>
        <li>修改标签</li>
        <li>更改成员</li>
        <li>更改封面</li>
        <li>移动</li>
        <li>复制</li>
        <li>编辑日期</li>
        <li>归档</li>
      </ul>
    </div>
  </BoardModal>
}

export default Index
