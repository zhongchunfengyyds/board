import { useCallback } from 'react'
import { useRecoilValue, selector, useSetRecoilState, SetterOrUpdater } from 'recoil'
import { CardListState } from './index'
import { CARD_LIST_TYPE } from '@/data/type'
import { apiCardUpdate, apiListUpdate } from '@/common/js/api'
const getCardListState = selector({ // 查找总的数据
    key: 'getCardListState',
    get: ({ get }): Array<CARD_LIST_TYPE> => get(CardListState)
})

export const useCardList = (): Array<CARD_LIST_TYPE> => useRecoilValue(getCardListState) // cardList的值
export const useCardListTitle = (): Array<string | number> => useCardList().map(item => item.listName) // 获取cardList => title
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
    const ChangeCardListSortAction = (val: CARD_LIST_TYPE[]) => { // 修改列表数据
        console.log(val, 'val');
        const newVal: CARD_LIST_TYPE[] = JSON.parse(JSON.stringify(val))
        newVal.forEach((item, index) => {
            if (item.sort < newVal[index - 1]?.sort) {
                let temp = item.sort
                item.sort = newVal[index - 1].sort
                newVal[index - 1].sort = temp
                apiListUpdate({
                    id: item.id,
                    listName: item.listName,
                    sort: item.sort
                })
                apiListUpdate({
                    id: newVal[index - 1].id,
                    listName: newVal[index - 1].listName,
                    sort: newVal[index - 1].sort
                })

            } else if (item.sort == newVal[index - 1]?.sort) {
                apiListUpdate({
                    id: item.id,
                    listName: item.listName,
                    sort: item.sort + 1
                })
            }
            item.cardItem.forEach((card, cardIndex) => {
                if (card.sort <= item.cardItem[cardIndex - 1]?.sort) {
                    let temp = card.sort
                    card.sort = item.cardItem[cardIndex - 1].sort + 1
                    item.cardItem[cardIndex - 1].sort = temp
                    apiCardUpdate({
                        id: card.id,
                        sort: card.sort,
                        tabulatedId: card.tabulatedId !== item.id ? item.id : card.tabulatedId
                    })
                    apiCardUpdate({
                        id: item.cardItem[cardIndex - 1].id,
                        sort: item.cardItem[cardIndex - 1].sort,
                        tabulatedId: card.tabulatedId !== item.id ? item.id : card.tabulatedId
                    })
                } else if (card.tabulatedId !== item.id) {
                    apiCardUpdate({
                        id: card.id,
                        sort: card.sort,
                        tabulatedId: item.id
                    })
                }
            })
        })
        setCardList(newVal)
    }
    return {
        ChangeCardListSortAction,
        AddCardListAction,
        ChangeCardAction
    }
}
