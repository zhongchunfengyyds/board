import { useCallback } from 'react'
import { useRecoilValue, selector, useSetRecoilState, SetterOrUpdater } from 'recoil'
import { CardListState } from './index'
import {CARD_LIST_TYPE} from '@/data/type'

const getCardListState = selector({ // 元数据
  key: 'getCardListState',
  get: ({get}): Array<CARD_LIST_TYPE> => get(CardListState)
})

export const useCardList = () => useRecoilValue(getCardListState) // cardList的值
export const useSetCardList = (): SetterOrUpdater<Array<CARD_LIST_TYPE> > => useSetRecoilState(CardListState)

export const useCardListAction = () => {
  const setCardList = useSetCardList()
  const cardList = useCardList()
  const AddCardListAction = useCallback((val?: CARD_LIST_TYPE, index?: number) => { // 添加
    index = index ?? cardList.length
    val = val ?? { title : 'test1111', cardItem: [] }
    const newCardList = [...cardList]
    newCardList.splice(index, 0, val)
    setCardList(newCardList)
  }, [])
  const ChangeCardAction = (val: CARD_LIST_TYPE, index: number) => { // 修改
    const newCardList = [...cardList]
    newCardList[index] = val
    setCardList(newCardList)
}
  return {
    AddCardListAction,
    ChangeCardAction
  }
}
