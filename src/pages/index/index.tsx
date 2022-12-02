import React, {useState, DragEvent} from 'react'
import {CARD_LIST_TYPE} from '@/data/type'
import {useCardList, useSetCardList, useCardListAction} from '@/store/useCardList'
import {useEventBusOn} from '@/hook/useEventBus'
import {useApiInitData} from '@/hook/useApiIntData'
import {useShareMsg} from '@/store/useShareMsg'
import {apiCardDetail} from '@/common/js/api'

import './index.scss'

import ContentCard from './components/ContentCard'
import CardDetailModal from './components/CardDetailModal'
import AddCardList from './components/AddCardList'

const Index = () => {
    const { Loading } = useApiInitData()
    const {setShareMsg} = useShareMsg()
    const [show, setShow] = useState(false)
    const cardList = useCardList()

    const {AddCardListAction, ChangeCardAction, ChangeCardListSortAction} = useCardListAction()

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
            ChangeCardListSortAction(newCardList)
        }
    }
    useEventBusOn('openCardDetail', (id: string) => {
        apiCardDetail({id}).then((res) => {
            setShow(true)
            setShareMsg(res.data.result)
        })
    })
    // 列表拖拽
    const dragListStart = (e: DragEvent, listValue: CARD_LIST_TYPE) => {
        const dom = e.target as HTMLElement
        dom.id = 'dragList'
        setTimeout(() => {
            dom.style.filter = 'brightness(0)'
            dom.style.opacity = '0.1'
        }, 100)
        localStorage.setItem('dragData', JSON.stringify(listValue))
    }
    const dragListEnter = (e: DragEvent<HTMLElement>) => {
        const dragList = document.getElementById('dragList')
        e.preventDefault()
        // if(e.nativeEvent.layer)
        if (e.nativeEvent.layerX > 135) {
            dragList && e.currentTarget.parentNode?.insertBefore(dragList, e.currentTarget)
        } else {
            dragList && e.currentTarget.parentNode?.insertBefore(dragList, e.currentTarget.nextSibling)
        }
    }
    const handleCardListEnd = (e: DragEvent<HTMLElement>, index: number) => {
        const dragData = JSON.parse(localStorage.getItem('dragData') || '{}')
        const dragList = document.getElementById('dragList') as HTMLElement
        if (!dragList) return
        let listIndex = 0
        if (dragList) {
            // 判断是父亲的第几个子元素
            for (let i = 0; i < dragList?.parentNode?.children?.length; i++) {
                const item = e.currentTarget.parentNode?.children[i]
                if (item.id === 'dragList') {
                    listIndex = i
                }
            }
            const newCardList: Array<CARD_LIST_TYPE> = cardList.filter((item, index) => {
                if (item.id === dragData.id) {
                    // 把dragList 放回去 不放回去会导致dragList丢失react无法渲染
                    dragList?.parentNode?.insertBefore(
                        dragList,
                        dragList?.parentNode?.children[listIndex > index ? index : index + 1],
                    )
                    dragList.id = ''
                    dragList.style.opacity = '1'
                    dragList.style.filter = 'unset'
                    return false
                } else {
                    return true
                }
            })
            newCardList.splice(listIndex, 0, dragData)
            ChangeCardListSortAction(newCardList)
        }
    }
    console.log(Loading)
    if ( Loading ) return <div>Loading...</div>
    return (
        <div className="pc-board">
            {cardList.map((item, index) => (
                <div
                 className='mr10'
                    draggable="true"
                    onDragStart={(e) => dragListStart(e, item)}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => dragListEnter(e)}
                    onDragEnd={(e) => {
                        handleCardListEnd(e, index)
                    }}
                    key={index}>
                    <ContentCard
                        cardValue={item}
                        handleChangeCard={(val) => ChangeCardAction(val, index)}
                        handleAddCardList={(val) => AddCardListAction(val, index + 1)}
                        handleCardDragEnd={handleCardDragEnd}
                    />
                </div>
            ))}
            <AddCardList></AddCardList>
            <CardDetailModal show={show} onClose={() => setShow(false)} />
        </div>
    )
}

export default Index
