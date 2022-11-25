import React, {FC, useMemo, ChangeEvent, useEffect, useState, memo} from 'react'
import {Mentions, Button, Popover, Tag, Divider, Input, DatePicker} from 'antd'
import {
    CloseOutlined,
    CheckSquareOutlined,
    FieldTimeOutlined,
    ColumnHeightOutlined,
    ShareAltOutlined,
    ContainerOutlined,
} from '@ant-design/icons'
const {Option} = Mentions
const {TextArea} = Input
const {RangePicker} = DatePicker
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import BoardModal from '@/components/BoardModal'
import './index.scss'
import {UserValue} from '@/data/type'
import MemberBtn from './BtnMember'
import BtnCheckList from './BtnCheckList'
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
    cardId: string
    onClose?: () => void
}

const Index: FC<PropsType> = ({show, cardId, onClose}) => {
    // 成员
    const [memberList, setMemberList] = useState<UserValue[]>([])
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
    const [dateOpen, setDateOpen] = useState(false)
    const updateDate = () => {
        setDateOpen(false)
    }
    const AddDateDom = useMemo(() => {
        return (
            <>
                <RangePicker
                    locale={locale}
                    onChange={(e, date) => {
                        setDate(date)
                    }}
                />
                <div></div>
                <Button className="mt10" size="small" type="primary" onClick={updateDate}>
                    完成
                </Button>
            </>
        )
    }, [dateOpen])
    // 清单 -------------------------------------------

    // 颜色 -------------------------------------------
    const [color, setColor] = useState('orange')
    const colorList = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#f50', '#2db7f5', '#87d068', '#108ee9']
    const popoverDom = useMemo(() => {
        return (
            <div className="header-popover">
                <Divider orientation="left">颜色</Divider>
                <div className="tags">
                    {colorList.map((item, index) => {
                        return (
                            <Tag
                                className="cursor-pointer"
                                color={item}
                                key={index}
                                onClick={() => {
                                    setColor(item)
                                }}></Tag>
                        )
                    })}
                </div>
                <div className="mt20"></div>
                <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                        setColor('')
                    }}>
                    移除颜色
                </Button>
            </div>
        )
    }, [color])

    return (
        <BoardModal show={show} onClose={onClose}>
            <div className="card-detail-modal">
                {color && (
                    <header style={{background: color}}>
                        <Popover placement="bottomLeft" content={popoverDom} trigger="click">
                            <Button type="text">拉伸</Button>
                        </Popover>
                    </header>
                )}
                <div className="close">
                    <Button shape="circle" type="text" icon={<CloseOutlined />} onClick={onClose} />
                </div>
                <div className="content">
                    <div className="content-left">
                        <DomTitle memberList={memberList} />
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
                        <Popover
                            placement="bottomLeft"
                            content={AddDateDom}
                            trigger="click"
                            open={dateOpen}
                            onOpenChange={() => {
                                setDateOpen(true)
                            }}>
                            <Button className="mt10" type="primary" block icon={<FieldTimeOutlined />}>
                                日期
                            </Button>
                        </Popover>

                        <Popover placement="bottomLeft" content={popoverDom} trigger="click">
                            <Button className="mt10" type="primary" block icon={<ColumnHeightOutlined />}>
                                拉伸
                            </Button>
                        </Popover>
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
