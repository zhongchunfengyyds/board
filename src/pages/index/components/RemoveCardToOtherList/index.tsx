import React, { useMemo, useState, FC } from 'react'
import { Popover, Button } from 'antd'
import { useCardListTitle, useCardList } from '@/store/useCardList'
import {CARD_LIST_TYPE} from '@/data/type'
import './index.scss'

import BoardSelect from '@/Components/BoardSelect'

interface PropsType {
  id: string 
}

const Index: FC<PropsType> = ({ id }) => { // 移动卡片到对应的列表
  const titleList = useCardListTitle()
  const cardList = useCardList()

  const [open, setOpen] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  }
  const handleDestination = () => { // 选择目的地
  }
  const handleList = () => { // 选择列表
  }
  const handlePosition = () => { // 选择当前列表位置
  }
  const handleRemove = () => { // 移动
  }
  const currentTitleList = useMemo(() => {
    return titleList.map(item => ({
      value: item,
      label: item
    }))
  }, [titleList])
  const currentList = useMemo(() => {
    return cardList.find(item => item.cardItem.findIndex(items => items.id === id) > -1)
  }, [cardList])
  const currentIndex = useMemo(() => {
    return (currentList as CARD_LIST_TYPE).cardItem.findIndex(item => item.id === id)
  }, [currentList])
  const optionList = useMemo(() => {
    return currentList?.cardItem.map((_,index) => ({
      value: index,
      label: `${index + 1}${currentIndex === index && '当前位置'}`
    }))
  }, [currentList, currentIndex])
  const REMOVE_CONT_DOM = useMemo(() => {
    return <div className='remove-card-to-other'>
      <h3>选择目的地</h3>
      <BoardSelect title='看板' options={[]} onChange={handleDestination}/>
      <footer>
        <BoardSelect title='列表' inline options={currentTitleList} onChange={handleList}/>
        <BoardSelect title='位置' inline options={optionList} onChange={handlePosition}/>
      </footer>
      <Button type="primary" onClick={handleRemove}>移动</Button>
    </div>
  }, [])
  return <Popover
      content={REMOVE_CONT_DOM}
      placement="topLeft"
      title="移动卡片"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
     <li>移动</li>
    </Popover>
}

export default Index
