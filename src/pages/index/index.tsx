import React, {useState, useMemo} from 'react'
import {CARD_LIST_TYPE} from '@/data/type'
import './index.scss'

import ContentCard from './components/ContentCard'

const Index = () => {
    const baseList: Array<CARD_LIST_TYPE> = [
        {
            title: '待办',
            show: false,
            cardItem: [
                {value: '待办1', id: 1610000000000},
                {value: '待办2', id: 1610000000001},
                {value: '待办3', id: 1610000000002},
            ],
        },
        {
            title: '进行中',
            show: false,
            cardItem: [
                {value: '进行中1', id: 1610000000003},
                {value: '进行中2', id: 1610000000004},
                {value: '进行中3', id: 1610000000005},
            ],
        },
        {title: '完成', show: false, cardItem: []},
    ]
    const [cardList, setCardList] = useState<Array<CARD_LIST_TYPE>>(baseList)

    const handleAdd = () => {
        // add card to list
        setCardList((res) => [
            ...res,
            {title: 'test_add', show: false, cardItem: []},
        ])
    }
    const handleCardChange = (
        val: CARD_LIST_TYPE,
        index: number,
        show?: boolean,
    ) => {
        const newCard = [...cardList]
        newCard[index] = show ? {...val, show} : val
        setCardList(newCard)
    }
    // 拖拽开始的时候把拖拽的数据存入了缓存，结束后取出来处理
    const handleCardDragEnd = () => {
        const dragData = JSON.parse(localStorage.getItem('dragData') || '{}')
        const dom = document.getElementById('dragCard')
        if (dom) {
            let listIndex = 0,
                cardIndex = 0
            const fatherDom =
                document.getElementsByClassName('pc-card-cont-wrap')
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

            const newCardList: Array<CARD_LIST_TYPE> = cardList.map(
                (item, index) => {
                    const res = item.cardItem.filter((item2, index2) => {
                        if (item2.id === dragData.id) {
                            // 把dom 放回去 不放回去会导致dom丢失react无法渲染
                            fatherDom[index].insertBefore(
                                dom,
                                fatherDom[index].children[index2],
                            )
                            dom.id = ''
                            dom.style.opacity = '1'
                            dom.style.filter = 'unset'
                            return false
                        } else {
                            return true
                        }
                    })
                    return {...item, cardItem: res}
                },
            )

            newCardList[listIndex].cardItem.splice(cardIndex, 0, dragData)
            setCardList(newCardList)
        }
    }
    return (
        <div className="pc-board">
            {cardList.map((item, index) => (
                <ContentCard
                    key={index}
                    cardValue={item}
                    handleCardChange={(val, show) =>
                        handleCardChange(val, index, show)
                    }
                    handleCardDragEnd={handleCardDragEnd}
                />
            ))}
            <div className="pc-card-cont pc-board-add" onClick={handleAdd}>
                添加另一个列表
            </div>
        </div>
    )
}

export default Index
