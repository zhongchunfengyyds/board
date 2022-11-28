import React, {useState, useCallback, useEffect} from 'react'
import { isEmpty } from 'lodash'
import {CARD_LIST_TYPE} from '@/data/type'
import {useCardList, useSetCardList, useCardListAction} from '@/store/useCardList'
import './index.scss'

import ContentCard from './components/ContentCard'
import CardDetailModal from './components/CardDetailModal'
import eventBus from '@/common/js/eventBus'

import {apiInitData} from '@/common/js/api'
const Index = () => {
    const [show, setShow] = useState(false)
    const [id, setId] = useState('')
    const cardList = useCardList()
    const setCardList = useSetCardList()
    const {AddCardListAction, ChangeCardAction} = useCardListAction()

    // 拖拽开始的时候把拖拽的数据存入了缓存，结束后取出来处理
    const handleCardDragEnd = () => {
        const dragData = JSON.parse(localStorage.getItem('dragData') || '{}')
        const dom = document.getElementById('dragCard')
        if (dom) {
            let listIndex = 0,
                cardIndex = 0
            const fatherDom = document.getElementsByClassName('pc-card-cont-wrap')
            // 判断dom在哪个父级中
            for (let i = 0; i < fatherDom.length; i++) {
                const item = fatherDom[i]
                if (item.contains(dom)) {
                    listIndex = i
                    for (let k = 0; k < item.children.length; k++) {
                        const child = item.children[k]
                        if (child.id === 'dragCard') {
                            cardIndex = k
                        }
                    }
                }
            }

            const newCardList: Array<CARD_LIST_TYPE> = cardList.map((item, index) => {
                const res = item.cardItem.filter((item2, index2) => {
                    if (item2.id === dragData.id) {
                        // 把dom 放回去 不放回去会导致dom丢失react无法渲染
                        fatherDom[index].insertBefore(dom, fatherDom[index].children[index2])
                        dom.id = ''
                        dom.style.opacity = '1'
                        dom.style.filter = 'unset'
                        return false
                    } else {
                        return true
                    }
                })
                return {...item, cardItem: res}
            })

            newCardList[listIndex].cardItem.splice(cardIndex, 0, dragData)
            setCardList(newCardList)
        }
    }

    eventBus.once('openCardDetail', (id: string) => {
        setShow(true)
        setId(id)
        console.log('viewAddCardItemlisten', eventBus.listenerCount('addCardItem'))
    })
    const getApiInitData = useCallback(async () => {
        const res = await apiInitData({
            userId: '1',
        }) as Record<string, any>
        const arr: CARD_LIST_TYPE[] = !isEmpty(res.data.result) && res.data.result.map((item: any) => {
            return {
                title: item.tabulated.listName,
                cardItem: item.listCard,
            }
        })
        setCardList(arr)
    }, [apiInitData])
    useEffect(() => {
        getApiInitData()
    }, [getApiInitData])
    return (
        <div className="pc-board">
            {cardList.map((item, index) => (
                <ContentCard
                    key={index}
                    cardValue={item}
                    handleChangeCard={(val) => ChangeCardAction(val, index)}
                    handleAddCardList={(val) => AddCardListAction(val, index + 1)}
                    handleCardDragEnd={handleCardDragEnd}
                />
            ))}
            <div className="pc-card-cont pc-board-add" onClick={() => AddCardListAction()}>
                添加另一个列表
            </div>
            {/* {useMemo(() => {
                return (
                    <CardDetailModal
                        show={show}
                        id={id}
                        ></CardDetailModal>
                )
                // 这样不太友好
            }, [show, id])} */}
            <CardDetailModal show={show} cardId={id} onClose={() => setShow(false)} />
        </div>
    )
}

export default Index
