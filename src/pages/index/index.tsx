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
                {value: '待办1', timestamp: 1610000000000},
                {value: '待办2', timestamp: 1610000000001},
                {value: '待办3', timestamp: 1610000000002},
            ],
        },
        {
            title: '进行中',
            show: false,
            cardItem: [
                {value: '进行中1', timestamp: 1610000000003},
                {value: '进行中2', timestamp: 1610000000004},
                {value: '进行中3', timestamp: 1610000000005},
            ],
        },
        {title: '完成', show: false},
    ]
    const [cardList, setCardList] = useState<Array<CARD_LIST_TYPE>>(baseList)

    const handleAdd = () => {
        // add card to list
        setCardList((res) => [...res, {title: 'test_add', show: false}])
    }
    const handleCardChange = (
        val: CARD_LIST_TYPE,
        index: number,
        show?: boolean,
    ) => {
        const newCard = [...cardList]
        newCard[index] = show ? {...val, show} : val
        console.log(newCard)
        setCardList(newCard)
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
                />
            ))}
            <div className="pc-card-cont pc-board-add" onClick={handleAdd}>
                添加另一个列表
            </div>
        </div>
    )
}

export default Index
