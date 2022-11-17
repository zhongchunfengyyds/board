import React, { useState, useCallback } from 'react'
import { CARD_LIST_TYPE } from '@/data/type'
import './index.scss'

import ContentCard from './components/ContentCard'

const baseList: Array<CARD_LIST_TYPE> = [
	{ title: '待办',  show: false },
	{ title: '进行中', show: false },
	{ title: '完成', show: false }
]
const Index = () => {
	const [cardList, setCardList] = useState<Array<CARD_LIST_TYPE>>(baseList)
	console.log('111111111111111111111', cardList)

	const handleAdd = () => { // add card to list
		setCardList(res => [ ...res, { title: 'test_add', show: false }])
	}
	const handleCardChange = (val: CARD_LIST_TYPE, index: number, show?: boolean) => {
		console.log('222222222222222222', cardList)
		// const newCard = [...cardList]
		// newCard[index] = val
		const newCard = cardList.map((item, i) => {
			if (i === index) return { ...val, show: true }
			else return {...item, show: false }
		})
		setCardList('33333333333333333', newCard)
	}

  return <div className='pc-board'>
		{
			cardList.map((item, index) => <ContentCard key={index} cardValue={item} handleCardChange={(val, show) => handleCardChange(val, index, show)}/>)
		}
		<div className='pc-card-cont pc-board-add' onClick={handleAdd}>添加另一个列表</div>
	</div>
}

export default Index
