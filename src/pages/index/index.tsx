import React, { useState } from 'react'
import { CARD_LIST_TYPE } from '@/data/type'
import './index.scss'

import ContentCard from './components/ContentCard'

const Index = () => {
	const baseList: Array<CARD_LIST_TYPE> = [
		{ title: '待办' },
		{ title: '进行中' },
		{ title: '完成' }
	]
	const [cardList, setCardList] = useState<Array<CARD_LIST_TYPE>>(baseList)

	const handleAdd = () => { // add card to list
		setCardList(res => [ ...res, { title: 'test_add' }])
	}
	const handleCardChange = (val: CARD_LIST_TYPE, index: number) => {
		const newCard = [...cardList]
		newCard[index] = val
		console.log(newCard)
		setCardList(cardList)
	}

  return <div className='pc-board'>
		{
			cardList.map((item, index) => <ContentCard key={index} cardValue={item} handleCardChange={(val) => handleCardChange(val, index)}/>)
		}
		<div className='pc-card-cont pc-board-add' onClick={handleAdd}>添加另一个列表</div>
	</div>
}

export default Index
