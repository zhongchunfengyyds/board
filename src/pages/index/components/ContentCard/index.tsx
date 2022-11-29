import React, {FC, useState, ChangeEvent, useMemo, useRef, DragEvent, memo, useCallback} from 'react'
import {CARD_LIST_TYPE} from '@/data/type'
import {isEmpty} from 'lodash'
import {useEventBus, useEventBusOn} from '@/hook/useEventBus'
import {useCurrentCardItem} from '@/store/useCurrentCardItem'

import './index.scss'
import EditCardModal from '../EditCardModal'
import CardListMoreOperation from '../CardListMoreOperation'
import AddCardItem from '../AddCardItem'

import {apiCardUpdate} from '@/common/js/api'

interface PropsType {
    cardValue: CARD_LIST_TYPE
    handleChangeCard: (value: CARD_LIST_TYPE) => void
    handleAddCardList: (val: CARD_LIST_TYPE) => void
    handleCardDragEnd: () => void // 拖拽结束
}
const ContentCard: FC<PropsType> = ({cardValue, handleChangeCard, handleAddCardList, handleCardDragEnd}) => {
    const {setCurrentCardItem} = useCurrentCardItem()
    const [status, setStatus] = useState<string>('') // 弹窗状态
    const [addStatus, setAddStatus] = useState<'btn' | 'input'>('btn') // 操作状态
    const currentEditIndex = useRef<number>(-1) // 防止重复渲染
    const [isHead, setIsHead] = useState<boolean>(false) // 判断是否为头插入
    const [position, setPositon] = useState({
        left: 10,
        top: 10,
    })
    const {emit} = useEventBus()

    const handleCurrentChange = (key: keyof CARD_LIST_TYPE, e: ChangeEvent<HTMLInputElement>) => {
        const newValue = {...cardValue, [key]: e.target.value}
        handleChangeCard(newValue)
    }

    useEventBusOn('addCardItem', () => {
        setAddStatus('btn')
    })

    const addCardItem = () => {
        emit('addCardItem')
        setAddStatus('input')
    }
    const handleAddCurrentNewCard = (val: string) => {
        // 添加卡片操作
        if (!val) return

        apiCardUpdate({
            title: val,
            sort: cardValue.cardItem.length + 1,
            tabulatedId: cardValue.id,
        }).then((res) => {
            console.log(res)
            const newValue = {...cardValue}
            if (isHead) {
                newValue.cardItem = [res.data.result, ...newValue.cardItem]
                setIsHead(false)
            } else {
                newValue.cardItem = newValue.cardItem.concat(res.data.result)
            }
            handleChangeCard(newValue)
        })
    }
    /**
     * 第一步：拖拽板子，原来的板子变成占位图
     * 第二步：拖拽到什么地方，占位图图就移动到什么地方
     * 第三步：拖拽结束，更新数据重新渲染dom
     */
    // 拖拽开始
    const dragCardStart = (e: DragEvent, index: number) => {
        const dom = e.target as HTMLElement
        dom.id = 'dragCard'
        setTimeout(() => {
            dom.style.filter = 'brightness(0)'
            dom.style.opacity = '0.1'
        }, 100)
        localStorage.setItem('dragData', JSON.stringify(cardValue.cardItem[index]))
    }
    // 拖拽进入
    const dragCardEnter = (e: DragEvent<HTMLElement>) => {
        const dragCard = document.getElementById('dragCard')
        e.preventDefault()
        dragCard && e.currentTarget.parentNode?.insertBefore(dragCard, e.currentTarget.nextSibling)
    }
    const titleDragEnter = (e: DragEvent<HTMLElement>) => {
        const dragCard = document.getElementById('dragCard')
        e.preventDefault()
        const parentNode: HTMLElement = e?.currentTarget.parentNode as HTMLElement
        if (parentNode.children[1].firstChild) {
            parentNode.children[1].insertBefore(dragCard as HTMLElement, parentNode.children[1].firstChild)
        } else {
            parentNode.children[1].appendChild(dragCard as HTMLElement)
        }
    }
    const handleEditCard = (index: number, e: any) => {
        // 编辑卡片
        // 每条card的编辑
        e.stopPropagation()
        const {clientX, clientY} = e
        setPositon({
            top: clientY - 32,
            left: clientX - 240,
        })
        setStatus('EDIT')
        currentEditIndex.current = index
        setCurrentCardItem(cardValue.cardItem[index])
    }

    const handleConfirmEdit = (name: string) => {
        const newValue: CARD_LIST_TYPE = JSON.parse(JSON.stringify({...cardValue}))
        if (!isEmpty(newValue.cardItem[currentEditIndex.current])) {
            newValue.cardItem[currentEditIndex.current] = {
                title: name,
                id: new Date().getTime().toString(),
            }
            handleChangeCard(newValue) // 和添加类似
        }
    }

    const handleCopyList = useCallback(
        (title: string | number) => {
            // 复制列表 ----title需要重写
            const newCardList = JSON.parse(JSON.stringify(cardValue))
            handleAddCardList({...newCardList, title})
        },
        [cardValue],
    )
    const handleAddCardNew = () => {
        // 头插入卡片
        setIsHead(true)
        addCardItem()
    }

    const CardItemDom = useMemo(() => {
        return (
            <div className="pc-card-cont-wrap">
                {cardValue.cardItem.map((item, index) => (
                    <div
                        className="item"
                        key={item.id}
                        onClick={() => emit('addCardItem', item.id)}
                        onDragStart={(e) => dragCardStart(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => dragCardEnter(e)}
                        onDragEnd={handleCardDragEnd}
                        draggable="true">
                        {item.background && <div className="item-header" style={{background: item.background}}></div>}
                        <div className="item-title"> {item.title} </div>

                        <i onClick={(e) => handleEditCard(index, e)}>编辑</i>
                    </div>
                ))}
            </div>
        )
    }, [cardValue.cardItem, handleCurrentChange, handleCardDragEnd])

    const ADD_DOM = useMemo(
        () => (
            <AddCardItem
                status={addStatus}
                handleAddCurrentCard={(val) => handleAddCurrentNewCard(val)}
                addCardItem={addCardItem}
            />
        ),
        [addStatus, handleAddCurrentNewCard, addCardItem],
    )

    return (
        <div className="pc-card-cont">
            <div
                className="title"
                onDragEnter={(e) => titleDragEnter(e)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={handleCardDragEnd}
                draggable="true">
                <input type="text" value={cardValue?.title ?? ''} onChange={(e) => handleCurrentChange('title', e)} />
                <CardListMoreOperation handleAddCard={handleAddCardNew} handleCopyList={(val) => handleCopyList(val)} />
            </div>
            {isHead && ADD_DOM}
            {CardItemDom}
            {!isHead && ADD_DOM}
            <EditCardModal
                handleConfirmEdit={(val: string) => handleConfirmEdit(val)}
                position={position}
                show={status === 'EDIT'}
                onClose={() => setStatus('')}
            />
        </div>
    )
}

export default memo(ContentCard)
