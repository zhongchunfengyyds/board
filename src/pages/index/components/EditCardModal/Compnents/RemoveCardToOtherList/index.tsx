import React, { useMemo, useState, FC } from 'react'
import { Popover, Button } from 'antd'
import { useCardListTitle, useCardList,useCardListAction } from '@/store/useCardList'
import {CARD_LIST_TYPE, CARD_ITEM_TYPE} from '@/data/type'
import './index.scss'

import BoardSelect from '@/Components/BoardSelect'

interface PropsType {
  id: string 
}

const Index: FC<PropsType> = ({ id }) => { // 移动卡片到对应的列表
  const titleList = useCardListTitle()
  const cardList = useCardList()
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [currentPosition, setCurrentPosition] = useState<string>('')
  const {ChangeCardAction} = useCardListAction()

  const [open, setOpen] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const handleDestination = (val: string) => { // 选择看板
    setCurrentPosition(val)
  }
  const handleList = (val: string) => { // 选择列表
    setCurrentTitle(val)
  }
  const handlePosition = (val: string) => { // 选择当前列表位置
    console.log(val)
    setCurrentPosition(val)
  }
  const currentTitleList = useMemo(() => {
    return titleList.map(item => ({
      value: item,
      label: item
    }))
  }, [titleList])
  const currentList = useMemo(() => {
    if (currentTitle) return cardList.find(item => item.title === currentTitle)
    return cardList.find(item => item.cardItem.findIndex(items => items.id === id) > -1)
  }, [cardList, id, currentTitle])
  const currentIndex = useMemo(() => {
    return (currentList as CARD_LIST_TYPE).cardItem.findIndex(item => item.id === id) ?? -1
  }, [currentList, id])
  const optionList = useMemo(() => {
    return currentList?.cardItem.map((_,index) => ({
      value: index,
      label: `${index + 1}${currentIndex === index ? '当前位置' : ''}`
    }))
  }, [currentList, currentIndex])
  const handleRemove = () => { // 移动 --- 利用recoil
    // let newVal:CARD_ITEM_TYPE
    // cardList.forEach(item => {
    //   item.cardItem.forEach(items => {
    //     if (items.id === id) {
    //       newVal = items
    //     }
    //   })
    // })
    // if (currentTitle && Number(currentPosition) >= 0) {
    //   (currentList as CARD_LIST_TYPE).cardItem.push(newVal)
    //   console.log(currentList)
    // }
  }
  const REMOVE_CONT_DOM = useMemo(() => {
    return <div className='remove-card-to-other'>
      <h3>选择目的地</h3>
      <BoardSelect title='看板' options={[]} onChange={handleDestination}/>
      <footer>
        <BoardSelect title='列表' value={currentTitle} inline options={currentTitleList} onChange={handleList}/>
        <BoardSelect title='位置' inline value={currentPosition} options={optionList} onChange={handlePosition}/>
      </footer>
      <Button type="primary" onClick={handleRemove}>移动</Button>
    </div>
  }, [optionList, currentTitleList])
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
