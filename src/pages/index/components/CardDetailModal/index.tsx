import React, {FC, useState, memo} from 'react'
import { Button, Divider} from 'antd'
import {CloseOutlined, ShareAltOutlined, ContainerOutlined} from '@ant-design/icons'
import 'dayjs/locale/zh-cn'
import BoardModal from '@/components/BoardModal'
import './index.scss'
import {UserValue} from '@/data/type'
import MemberBtn from './BtnMember'
import BtnCheckList from './BtnCheckList'
import BtnDate from './BtnDate'
import BtnColor from './BtnColor'
import DomTitle from './DomTitle'
import DomDes from './DomDes'
import DomComment from './DomComment'
import {Comment} from './DomComment'
import DomFile from './DomFile'
import {NewUploadFile} from './DomFile'
import DomCheckList from './DomCheckList'
import {CheckList} from './DomCheckList'

interface PropsType {
    show: boolean
    onClose?: () => void
}
// TODO 利用Recoil => currentItem 存取当前cardItem detail
const Index: FC<PropsType> = ({show, onClose}) => {
    // 成员
    const [memberList, setMemberList] = useState<UserValue[]>([])
    // 日期
    const [date, setDate] = useState<string[]>([])
    // 附件
    const [fileList, setFileList] = useState<NewUploadFile[]>([])
    // 描述
    const [des, setDes] = useState('')
    // 评论
    const [commentList, setCommentList] = useState<Comment[]>([])
    // 清单
    const [checkList, setCheckList] = useState<CheckList[]>([])
    const newChecklist = (e: string) => {
        setCheckList([
            ...checkList,
            {
                items: e,
                isAccomplish: false,
            },
        ])
    }
    // 颜色 -------------------------------------------
    const [color, setColor] = useState('orange')

    return (
        <BoardModal show={show} onClose={onClose}>
            <div className="card-detail-modal">
                {color && <header style={{background: color}}></header>}
                <div className="close">
                    <Button shape="circle" type="text" icon={<CloseOutlined />} onClick={onClose} />
                </div>
                <div className="content">
                    <div className="content-left">
                        <DomTitle memberList={memberList} date={date} />
                        <DomDes
                            des={des}
                            onChange={(e) => {
                                setDes(e)
                            }}
                        />
                        <DomCheckList checkList={checkList} />
                        <DomFile
                            fileList={fileList}
                            onChange={(fileList) => {
                                setFileList(fileList)
                            }}
                        />
                        <DomComment
                            commentList={commentList}
                            onChange={(list) => {
                                setCommentList(list)
                            }}
                        />
                    </div>
                    <div className="content-right">
                        <Divider orientation="left">建议的标签</Divider>
                        <MemberBtn
                            onChange={(e: UserValue[]) => {
                                setMemberList(e)
                            }}
                        />
                        <BtnCheckList onChange={newChecklist} />
                        <BtnDate
                            onChange={(e) => {
                                setDate(e)
                            }}
                        />
                        <BtnColor
                            onChange={(e) => {
                                setColor(e)
                            }}
                        />
                        <Divider orientation="left">操作</Divider>
                        <Button type="primary" block icon={<ShareAltOutlined />}>
                            分享
                        </Button>
                        <Button className="mt10" type="primary" block icon={<ContainerOutlined />}>
                            归档
                        </Button>
                    </div>
                </div>
            </div>
        </BoardModal>
    )
}

export default memo(Index) // 等同于你刚的效果
