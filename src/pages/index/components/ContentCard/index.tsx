import React, {
    FC,
    useState,
    ChangeEvent,
    useMemo,
    useRef,
    DragEvent,
} from 'react'
import {CARD_LIST_TYPE} from '@/data/type'

import './index.scss'
import BoardMoreBtns from '@/components/BoardMoreBtns'
import EditCardModal from '../EditCardModal'
import eventBus from '@/common/js/eventBus'

interface PropsType {
    cardValue: CARD_LIST_TYPE
    handleCardChange: (value: CARD_LIST_TYPE, show?: boolean) => void
    handleCardDragEnd: () => void // 拖拽结束
}
const ContentCard: FC<PropsType> = ({
    cardValue,
    handleCardChange,
    handleCardDragEnd,
}) => {
    console.log('cardValue', cardValue)
    const [show, setShow] = useState<boolean>(false)
    const [status, setStatus] = useState<string>('')
    const currentEditIndex = useRef<number>(-1)
    const [position, setPositon] = useState({
        left: 10,
        top: 10,
    })

    const addCardTextValue = useRef<string>('')
    const handleCurrentChange = (
        key: keyof CARD_LIST_TYPE,
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        // change default value
        const newValue = {...cardValue, [key]: e.target.value}
        handleCardChange(newValue)
    }
    eventBus.once('addCardItem', () => {
        console.log('on addCardItem')
        setShow(false)
    })
    const addCardItem = () => {
        eventBus.emit('addCardItem')
        setShow(true)
    }
    const handleAddCurrentNewCard = () => {
        // 添加卡片操作
        if (!addCardTextValue.current) return
        const newCard = {
            title: addCardTextValue.current,
            id: new Date().getTime().toString(),
        }
        addCardTextValue.current = ''
        const newValue = {...cardValue}
        newValue.cardItem.push(newCard)
        setShow(false)
        handleCardChange(newValue)
    }
    const handleCancel = () => {
        // 取消添加值
        addCardTextValue.current = ''
        setShow(false)
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
        localStorage.setItem(
            'dragData',
            JSON.stringify(cardValue.cardItem[index]),
        )
    }
    // 拖拽进入
    const dragCardEnter = (e: DragEvent<HTMLElement>) => {
        const dragCard = document.getElementById('dragCard')
        e.preventDefault()
        dragCard &&
            e.currentTarget.parentNode?.insertBefore(
                dragCard,
                e.currentTarget.nextSibling,
            )
    }
    const titleDragEnter = (e: DragEvent<HTMLElement>) => {
        const dragCard = document.getElementById('dragCard')
        e.preventDefault()
        if (e.currentTarget.parentNode.children[1].firstChild) {
            e.currentTarget.parentNode.children[1].insertBefore(
                dragCard,
                e.currentTarget.parentNode.children[1].firstChild,
            )
        } else {
            e.currentTarget.parentNode.children[1].appendChild(dragCard)
        }
    }
    const handleEditCard = (index: number, e: any) => {
        // 每条card的编辑
        e.stopPropagation()
        const {clientX, clientY} = e
        setPositon({
            top: clientY - 32,
            left: clientX - 240,
        })
        setStatus('EDIT')
        currentEditIndex.current = index
    }

    const handleConfirmEdit = (title: string) => {
        // const newValue: CARD_LIST_TYPE = { ...cardValue }
        const newValue: CARD_LIST_TYPE = {...cardValue}
        if (newValue.cardItem && newValue.cardItem[currentEditIndex.current]) {
            newValue.cardItem[currentEditIndex.current] = {
                title,
                id: new Date().getTime().toString(),
            }
            // setcardValue(newValue)
            handleCardChange(newValue)
        }
    }

    const AddCardDom = useMemo(() => {
        if (show) {
            return (
                <>
                    <textarea
                        defaultValue={addCardTextValue.current}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            (addCardTextValue.current = e.target.value)
                        }
                        className="pc-card-cont-text"
                        placeholder="为这张卡片输入标题…"
                    />
                    <div className="pc-card-cont-btns">
                        <button onClick={handleAddCurrentNewCard}>
                            添加卡片
                        </button>
                        <button className="cancle" onClick={handleCancel}>
                            取消
                        </button>
                        <BoardMoreBtns />
                    </div>
                </>
            )
        } else {
            return (
                <div className="pc-card-cont-add" onClick={addCardItem}>
                    添加卡片
                </div>
            )
        }
    }, [show, addCardTextValue.current, handleAddCurrentNewCard])

    const CardItemDom = useMemo(() => {
        return (
            <div className="pc-card-cont-wrap">
                {cardValue.cardItem.map((item, index) => (
                    <div
                        className="item"
                        key={item.id}
                        onClick={() => eventBus.emit('openCardDetail', item.id)}
                        onDragStart={(e) => dragCardStart(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => dragCardEnter(e)}
                        onDragEnd={handleCardDragEnd}
                        draggable="true">
                        {item.background && (
                            <div
                                className="item-header"
                                style={{background: item.background}}></div>
                        )}
                        <div className="item-title"> {item.title} </div>

                        <i onClick={(e) => handleEditCard(index, e)}>编辑</i>
                    </div>
                ))}
            </div>
        )
    }, [cardValue.cardItem, handleCurrentChange, handleCardDragEnd])

    return (
        <div className="pc-card-cont">
            <div
                className="title"
                onDragEnter={(e) => titleDragEnter(e)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={handleCardDragEnd}
                draggable="true">
                <input
                    type="text"
                    value={cardValue?.title ?? ''}
                    onChange={(e) => handleCurrentChange('title', e)}
                />
                {/*title operation  */}
                <BoardMoreBtns />
            </div>
            {CardItemDom}
            {AddCardDom}
            <EditCardModal
                handleConfirmEdit={(val: string) => handleConfirmEdit(val)}
                position={position}
                show={status === 'EDIT'}
                onClose={() => setStatus('')}
                id={
                    cardValue.cardItem[currentEditIndex.current] &&
                    cardValue.cardItem[currentEditIndex.current].id
                }
                title={
                    cardValue.cardItem[currentEditIndex.current] &&
                    cardValue.cardItem[currentEditIndex.current].title
                }
            />
        </div>
    )
}

export default ContentCard
