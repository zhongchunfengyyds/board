import React, { FC, useState, ChangeEvent, useMemo, useRef } from 'react'
import { CARD_LIST_TYPE } from '@/data/type'

import './index.scss'
import BoardMoreBtns from '@/Components/BoardMoreBtns'
import EditCardModal from '../EditCardModal'

interface PropsType {
    cardValue: CARD_LIST_TYPE
    handleCardChange: (value: CARD_LIST_TYPE) => void
}
const ContentCard: FC<PropsType> = ({ cardValue, handleCardChange }) => {
    const [currentCard, setCurrentCard] = useState<CARD_LIST_TYPE>(cardValue)
    const [showAddEdit, setShowAddEdit] = useState<boolean>(false)
    const [status, setStatus] = useState<string>('')
    const [position, setPositon] = useState({
        left: 10,
        top: 10
    })
    const addCardTextValue = useRef<string>('')
    const handleCurrentChange = (key: keyof CARD_LIST_TYPE, e: ChangeEvent<HTMLInputElement>) => { // change default value
        const newValue = { ...currentCard, [key]: e.target.value }
        setCurrentCard(newValue)
        handleCardChange(newValue)
    }

    const handleAddCurrentNewCard = () => { // 添加卡片操作
        if (!addCardTextValue.current) return
        const newCard = { value: addCardTextValue.current, timestamp: (new Date).getTime()}
        addCardTextValue.current = ''
        const newValue = { ...currentCard }
        newValue.cardItem = newValue.cardItem ? newValue.cardItem.concat(newCard) : [ newCard ]
        setCurrentCard(newValue)
        handleCardChange(newValue)
        setShowAddEdit(false)
    }
    const handleCancel = () => { // 取消添加值
        addCardTextValue.current = ''
        setShowAddEdit(false)
    }

    const handleViewDetail = () => { // 点击input弹窗详情
        console.log('handleViewDetail------------')
    }

    const handleEditCard = (e: MouseEvent) => { // 每条card的编辑
        e.stopPropagation()
        const { clientX, clientY } = e
        setPositon({
            top: clientY - 32,
            left: clientX -220
        })
        setStatus('EDIT')
    }
    
    const AddCardDom = useMemo(() => {
        if (showAddEdit) {
            return <>
                <textarea defaultValue={addCardTextValue.current} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => addCardTextValue.current = e.target.value} className='pc-card-cont-text' placeholder='为这张卡片输入标题…'/>
                <div className='pc-card-cont-btns'>
                    <button onClick={handleAddCurrentNewCard}>添加卡片</button>
                    <button className='cancle' onClick={handleCancel}>取消</button>
                    <BoardMoreBtns />
                </div>
            </>
        } else {
            return <div className='pc-card-cont-add' onClick={() => setShowAddEdit(true)}>添加卡片</div>
        }
    }, [showAddEdit])

    const CardItemDom = useMemo(() => {
        if (currentCard.cardItem && currentCard.cardItem.length > 0) {
            return <div className='pc-card-cont-wrap'>
                {
                    currentCard.cardItem.map(item => <div className='item' key={item.timestamp} onClick={handleViewDetail}>
                        <input type="text" defaultValue={item?.value} onChange={(e) => handleCurrentChange('title', e)}/>
                        <i onClick={handleEditCard}>编辑</i>
                    </div>)
                }
            </div>
        } else {
            return null
        }
    }, [currentCard.cardItem])

    return <div className='pc-card-cont'>
        <div className='title'>
            <input type="text" defaultValue={currentCard?.title} onChange={(e) => handleCurrentChange('title', e)}/>
            {/*title operation  */}
            <BoardMoreBtns />
        </div>
        {CardItemDom}
        {AddCardDom}
		<EditCardModal position={position} show={ status === 'EDIT' } onClose={() => setStatus('')} value='11111111111'/>
    </div>
}

export default ContentCard
