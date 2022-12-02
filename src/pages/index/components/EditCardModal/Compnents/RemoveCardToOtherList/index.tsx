import React, { useMemo, useState, FC, useEffect } from 'react'
import { isEmpty, isEqual } from 'lodash'
import { Popover, Button } from 'antd'
import {useShareMsg} from '@/store/useShareMsg'
import { useCardListTitle, useCardList,useCardListAction } from '@/store/useCardList'
import {CARD_LIST_TYPE, CARD_ITEM_TYPE} from '@/data/type'
import './index.scss'

import BoardSelect from '@/components/BoardSelect'

interface OptionsType {
  value: number
  label: string
}
interface PropsType{
  onClose: () => void
}
const Index: FC<PropsType> = ({ onClose }) => { // 移动卡片到对应的列表
  const titleList = useCardListTitle()
  const cardList = useCardList()
  const { shareMsg } = useShareMsg()
  const { id } = shareMsg
  const [currentTitle, setCurrentTitle] = useState<string|number>()
  const [currentPosition, setCurrentPosition] = useState<string | number>('')
  const {ChangeCardAction} = useCardListAction()

  const [open, setOpen] = useState(false)
  const hide = () => {
      setOpen(false)
  }
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
    setCurrentPosition(val)
  }
  const currentTitleList = useMemo(() => {
    return titleList.map(item => ({
      value: item,
      label: item
    }))
  }, [titleList])
  const currentList = useMemo(() => { // 根据title查找当前列表
    if (currentTitle) return cardList.find(item => item.listName === currentTitle)
    return cardList.find(item => item.cardItem.findIndex(items => items.id === id) > -1)
  }, [cardList, id, currentTitle])
  const currentIndex = useMemo(() => { // 所在cardItem index
    return (currentList as CARD_LIST_TYPE).cardItem.findIndex(item => item.id === id) ?? -1
  }, [currentList, id])
  const optionList: OptionsType[] = useMemo(() => { 
    if (isEmpty(currentList?.cardItem)) { // 没有cardItem 默认给一个
      return [
        {
          value: 0,
          label: '1'
        }
      ]
    }
    return currentList?.cardItem.map((_,index) => ({
      value: index,
      label: `${index + 1}${currentIndex === index ? '当前位置' : ''}`
    })) ?? []
  }, [currentList, currentIndex])
  const handleRemove = () => {
    if (currentTitle && Number(currentPosition) >= 0) {
      // 新列表新增
      let newList = JSON.parse(JSON.stringify(currentList as CARD_LIST_TYPE))
      const oldIndex = newList.cardItem.findIndex((item: CARD_ITEM_TYPE) => isEqual(item, shareMsg))
      const index = currentTitleList.findIndex(item => item.value === currentTitle) // 当前是哪一列
      if (oldIndex > -1) { // 1、原列表----替换位置
        newList.cardItem.splice(oldIndex, 1)
      }
      newList.cardItem.splice(currentPosition, 0, shareMsg)
      ChangeCardAction(newList, index)
      hide()
      onClose()
    }
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
  }, [optionList, currentTitleList, currentTitle, currentPosition])

  useEffect(() => {
    setCurrentTitle(currentList?.listName ?? '')
    const index = currentIndex > -1 ? currentIndex : (optionList?.length - 1)
    setCurrentPosition(optionList?.[index].label)
  }, [currentList, currentIndex, optionList])
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
