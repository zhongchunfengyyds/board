import { useCallback } from 'react'
import { useRecoilValue, selector, useSetRecoilState, SetterOrUpdater } from 'recoil'
import { CardListState } from './index'
import { CARD_LIST_TYPE } from '@/data/type'
import { apiCardUpdate } from '@/common/js/api'
const getCardListState = selector({ // 查找总的数据
    key: 'getCardListState',
    get: ({ get }): Array<CARD_LIST_TYPE> => get(CardListState)
})

export const useCardList = (): Array<CARD_LIST_TYPE> => useRecoilValue(getCardListState) // cardList的值
export const useCardListTitle = (): Array<string | number> => useCardList().map(item => item.title) // 获取cardList => title
export const useSetCardList = (): SetterOrUpdater<Array<CARD_LIST_TYPE>> => useSetRecoilState(CardListState)

export const useCardListAction = () => {
    const setCardList = useSetCardList()
    const cardList = useCardList()
    const AddCardListAction = useCallback((val: CARD_LIST_TYPE, index?: number) => { // 添加列表数据
        index = index ?? cardList.length
        const newCardList = JSON.parse(JSON.stringify(cardList))
        newCardList.splice(index, 0, val)
        setCardList(newCardList)
    }, [cardList, setCardList])
    const ChangeCardAction = useCallback((val: CARD_LIST_TYPE, index: number) => { // 修改添加卡片数据
        const newCardList = JSON.parse(JSON.stringify(cardList))
        newCardList[index] = val
        setCardList(newCardList)
    
    }, [setCardList, cardList])
    return {
        AddCardListAction,
        ChangeCardAction
    }
}
