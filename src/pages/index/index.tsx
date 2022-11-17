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

	const handleAdd = () => { // add list to card
		setCardList(res => [ ...res, { title: 'test_add' }])
	}

  return <div className='pc-board'>
		{
			cardList.map((item, index) => <ContentCard key={index} {...item} handleAdd={handleAdd}/>)
		}
		<div className='pc-card-cont pc-board-add'>添加另一个列表</div>
	</div>
}

export default Index
