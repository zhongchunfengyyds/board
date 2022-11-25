import React, { ChangeEvent, useState, FC, memo } from 'react'

import BoardMoreBtns from '@/Components/BoardMoreBtns'
import './index.scss'
interface PropsType {
  status: 'btn' | 'input' // 切换状态
  handleAddCurrentCard: (val: string) => void
  addCardItem: () => void
}

const Index: FC<PropsType> = ({ status = 'btn', addCardItem, handleAddCurrentCard }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const handleCancel = () => {
    setInputValue('')
  }
  if (status === 'input') {
    return (
      <>
          <textarea
              value={inputValue ?? ''}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInputValue(e.target.value)
              }
              className="pc-card-cont-text"
              placeholder="为这张卡片输入标题…"
          />
          <div className="pc-card-cont-btns">
              <button onClick={() => {
                handleCancel()
                handleAddCurrentCard(inputValue)
              }}>
                  添加卡片
              </button>
              <button className="cancle" onClick={handleCancel}>
                  取消
              </button>
              <BoardMoreBtns />
          </div>
      </>
    )
  }
  return (
    <div className="pc-card-cont-add" onClick={addCardItem}>
        添加卡片
    </div>
  )
}

export default memo(Index)
