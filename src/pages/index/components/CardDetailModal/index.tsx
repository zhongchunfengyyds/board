import React, {FC, useState, memo} from 'react'
import {Button, Divider} from 'antd'
import {CloseOutlined, ShareAltOutlined, ContainerOutlined} from '@ant-design/icons'
import 'dayjs/locale/zh-cn'
import BoardModal from '@/components/BoardModal'
import './index.scss'
import MemberBtn from './BtnMember'
import BtnCheckList from './BtnCheckList'
import BtnDate from './BtnDate'
import BtnColor from './BtnColor'
import DomTitle from './DomTitle'
import DomDes from './DomDes'
import DomComment from './DomComment'
import DomFile from './DomFile'
import DomCheckList from './DomCheckList'

import {useCurrentCardItem} from '@/store/useCurrentCardItem'
import {apiCardDelete} from '@/common/js/api'
interface PropsType {
    show: boolean
    onClose?: () => void
}
// TODO 利用Recoil => currentItem 存取当前cardItem detail
const Index: FC<PropsType> = ({show, onClose}) => {
    const {currentCardItem, setCurrentCardItem} = useCurrentCardItem()
    console.log('currentCardItem', currentCardItem)
    const delCard = ()=>{
        apiCardDelete({
            id: currentCardItem.card.id
        }).then((res)=>{
            
            onClose?.()
        })
    }
    return (
        <BoardModal show={show} onClose={onClose}>
            <div className="card-detail-modal">
                {currentCardItem.card.color && <header style={{background: currentCardItem.card.color}}></header>}
                <div className="close">
                    <Button shape="circle" type="text" icon={<CloseOutlined />} onClick={onClose} />
                </div>
                <div className="content">
                    <div className="content-left">
                        <DomTitle />
                        <DomDes />
                        <DomCheckList />
                        <DomFile />
                        <DomComment />
                    </div>
                    <div className="content-right">
                        <Divider orientation="left">建议的标签</Divider>
                        <MemberBtn />
                        <BtnCheckList />
                        <BtnDate />
                        <BtnColor />
                        <Divider orientation="left">操作</Divider>
                        {/* <Button type="primary" block icon={<ShareAltOutlined />}>
                            分享
                        </Button> */}
                        <Button className="mt10" type="primary" block icon={<ContainerOutlined />} onClick={delCard}>
                            删除
                        </Button>
                    </div>
                </div>
            </div>
        </BoardModal>
    )
}

export default memo(Index) // 等同于你刚的效果
