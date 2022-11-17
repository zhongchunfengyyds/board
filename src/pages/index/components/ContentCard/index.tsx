import React, { FC, useState, ChangeEvent, useMemo, useRef, useEffect } from 'react'
import { CARD_LIST_TYPE } from '@/data/type'

import './index.scss'
import BoardMoreBtns from '@/Components/BoardMoreBtns'
import EditCardModal from '../EditCardModal'

interface PropsType {
    cardValue: CARD_LIST_TYPE
    handleCardChange: (value: CARD_LIST_TYPE, show?: boolean) => void
}
const ContentCard: FC<PropsType> = ({ cardValue, handleCardChange }) => {
    console.log(cardValue)
    const [showAddEdit, setShowAddEdit] = useState<boolean>(false)
    const [status, setStatus] = useState<string>('')
    const currentEditIndex = useRef<number>(-1)
    const [position, setPositon] = useState({
        left: 10,
        top: 10
    })

    const addCardTextValue = useRef<string>('')
    const handleCurrentChange = (key: keyof CARD_LIST_TYPE, e: ChangeEvent<HTMLInputElement>) => { // change default value
        const newValue = { ...cardValue, [key]: e.target.value }
        handleCardChange(newValue)
    }

    const handleAddCurrentNewCard = () => { // 添加卡片操作
        if (!addCardTextValue.current) return
        const newCard = { value: addCardTextValue.current, timestamp: (new Date).getTime() }
        addCardTextValue.current = ''
        const newValue = { ...cardValue }
        newValue.cardItem = newValue.cardItem ? newValue.cardItem.concat(newCard) : [ newCard ]
        handleCardChange(newValue)
        setShowAddEdit(false)
    }

    const handleShowAddCardItem = () => {
        handleCardChange(cardValue, true)
        setShowAddEdit(true)
    }
    
    const handleCancel = () => { // 取消添加值
        addCardTextValue.current = ''
        setShowAddEdit(false)
    }

    const handleViewDetail = () => { // 点击input弹窗详情
        console.log('handleViewDetail2233233------------')
    }
    const dragCardStart = (e: React.DragEvent, index: number) => { // 拖拽卡片
        e.dataTransfer.setData('cardItem',JSON.stringify(cardValue.cardItem[index]))
        // currentCard.cardItem.splice(index, 1)
        // setCurrentCard(JSON.parse(JSON.stringify(currentCard)))
        console.log('dragCardStart------------', cardValue);
    }
    const dragCardEnd = (e: React.DragEvent, currentCard: CARD_LIST_TYPE) => { // 拖拽卡片
        console.log('dragCardEnd------------', currentCard);
    }
    const dropCard = (e: React.DragEvent, currentCard: CARD_LIST_TYPE) => { // 拖拽卡片
        console.log('dropCard------------', e);
        console.log('dropCard------------', currentCard);
    }

    const handleEditCard = (index: number, e: any) => { // 每条card的编辑
        e.stopPropagation()
        const { clientX, clientY } = e
        setPositon({
            top: clientY - 32,
            left: clientX -240
        })
        setStatus('EDIT')
        currentEditIndex.current = index
    }

    const handleConfirmEdit = (value: string) => {
        console.log(value)
        // const newValue: CARD_LIST_TYPE = { ...currentCard }
        const newValue: CARD_LIST_TYPE = { ...cardValue }
        if ( newValue.cardItem && newValue.cardItem[currentEditIndex.current]) {
            newValue.cardItem[currentEditIndex.current] = { value , timestamp: (new Date).getTime()}
            console.log(newValue)
            // setCurrentCard(newValue)
            handleCardChange(newValue)
        }
    }

    const AddCardDom = useMemo(() => {
        if (showAddEdit && cardValue.show) {
            return <>
                <textarea defaultValue={addCardTextValue.current} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => addCardTextValue.current = e.target.value} className='pc-card-cont-text' placeholder='为这张卡片输入标题…' />
                <div className='pc-card-cont-btns'>
                    <button onClick={handleAddCurrentNewCard}>添加卡片</button>
                    <button className='cancle' onClick={handleCancel}>取消</button>
                    <BoardMoreBtns />
                </div>
            </>
        } else {
            return <div className='pc-card-cont-add' onClick={handleShowAddCardItem}>添加卡片</div>
        }
    }, [showAddEdit, cardValue.show, addCardTextValue.current, handleAddCurrentNewCard, handleShowAddCardItem])

    const CardItemDom = useMemo(() => {
        if (cardValue.cardItem && cardValue.cardItem.length > 0) {
            return <div className='pc-card-cont-wrap'>
                {
                    cardValue.cardItem.map((item, index) => <div className='item' key={item.timestamp} onClick={handleViewDetail}>
                        <input type="text" value={item?.value ?? ''} onChange={(e) => handleCurrentChange('title', e)}/>
                        <i onClick={(e) => handleEditCard(index, e)}>编辑</i>
                    </div>)
                }
            </div>
        } else {
            return null
        }
    }, [cardValue.cardItem,handleViewDetail, handleCurrentChange])

    return <div className='pc-card-cont'>
        <div className='title'>
            <input type="text" value={cardValue?.title ?? ''} onChange={(e) => handleCurrentChange('title', e)}/>
            {/*title operation  */}
            <BoardMoreBtns />
        </div>
        {CardItemDom}
        {AddCardDom}
		<EditCardModal handleConfirmEdit={(val: string) => handleConfirmEdit(val)} position={position} show={ status === 'EDIT' } onClose={() => setStatus('')} value={cardValue.cardItem && cardValue.cardItem[currentEditIndex.current] && cardValue.cardItem[currentEditIndex.current].value}/>
    </div>
}

export default ContentCard
