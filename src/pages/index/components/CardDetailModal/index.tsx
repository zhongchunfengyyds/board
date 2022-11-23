import React, {FC, useMemo, ChangeEvent, useEffect, useState, memo} from 'react'
import {Mentions, Button, Checkbox, Col, Row, Popover, List, Tag, Divider, Input} from 'antd'
import {
    CreditCardOutlined,
    MenuUnfoldOutlined,
    OrderedListOutlined,
    CommentOutlined,
    CloseOutlined,
    CheckSquareOutlined,
    FieldTimeOutlined,
    PaperClipOutlined,
    ColumnHeightOutlined,
    ShareAltOutlined,
    ContainerOutlined,
} from '@ant-design/icons'
const {Option} = Mentions
const {TextArea} = Input
import BoardModal from '@/components/BoardModal'
import './index.scss'
import {Comment, CheckList} from '@/data/type'

interface PropsType {
    show: boolean
    cardId: string
    onClose?: () => void
}

const Index: FC<PropsType> = ({show, cardId, onClose}) => {
    // 头部标题 -------------------------------------------
    const titleDom = useMemo(() => {
        return (
            <div className="content-left-item">
                <CreditCardOutlined />
                <div className="right">
                    <h3>标题</h3>
                    <div className="desc">介绍</div>
                </div>
            </div>
        )
    }, [])

    // 描述 -------------------------------------------
    const DesDOm = useMemo(() => {
        return (
            <div className="content-left-item">
                <MenuUnfoldOutlined />
                <div className="right">
                    <div className="title">描述</div>
                    <div className="pt10"></div>
                    <div className="desc">有多少爱可以重来，有多少人愿意等待</div>
                </div>
            </div>
        )
    }, [])

    // 清单 -------------------------------------------
    const [checkList, setCheckList] = useState<CheckList[]>([])
    const newChecklist = () => {
        setCheckList([
            ...checkList,
            {
                items: '12121212',
                isAccomplish: false,
                cardId,
            },
        ])
    }
    //  所有清单dom
    const ChecklistDom = useMemo(() => {
        return (
            <div className="content-left-item">
                <OrderedListOutlined />
                <div className="right">
                    <div className="title">清单</div>
                    <div className="pt12"></div>
                    <Checkbox.Group style={{width: '100%'}}>
                        <Row gutter={[0, 10]}>
                            {checkList.map((item, index) => {
                                return (
                                    <Col span={24} key={index}>
                                        <Checkbox value={item.items}>{item.items}</Checkbox>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Checkbox.Group>
                </div>
            </div>
        )
    }, [checkList])
    //  添加清单dom
    const AddCheckListDom = useMemo(() => {
        return (
            <div>
                <TextArea placeholder="请输入清单内容" autoSize />
                <Button className='mt10' size="small" type="primary" onClick={newChecklist}>
                    添加
                </Button>
            </div>
        )
    }, [])

    //评论 -------------------------------------------
    const data = [
        {
            commentName: '张三',
            commentContent: '有多少爱可以重来，有多少人愿意等待',
            cardId: '1',
            commentId: '1',
        },
    ]
    const [commentList, setCommentList] = useState<Comment[]>(data)
    const [commentValue, setCommentValue] = useState('')
    const newComment = () => {
        console.log(commentValue)
        // 调接口评论
        commentList.push({
            commentName: '张三',
            commentContent: commentValue,
            cardId: '1',
            commentId: '1',
        })
        setCommentList([...commentList])
        setCommentValue('')
    }
    const CommentDom = useMemo(() => {
        return (
            <div className="content-left-item">
                <CommentOutlined />
                <div className="right">
                    <div className="title">评论</div>
                    <div className="pt10"></div>
                    <div className="comment">
                        <Mentions
                            autoSize
                            value={commentValue}
                            onChange={(e: string) => {
                                setCommentValue(e)
                            }}
                            style={{width: '100%'}}
                            placeholder="添加评论"></Mentions>
                        <div className="mt10"></div>
                        <Button size="small" type="primary" onClick={newComment}>
                            评论
                        </Button>
                        <div className="mt20"></div>
                        <List
                            size="small"
                            itemLayout="horizontal"
                            dataSource={commentList}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta title={item.commentName} description={item.commentContent} />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }, [commentList, commentValue])

    // 颜色 -------------------------------------------
    const [color, setColor] = useState('orange')
    const popoverDom = useMemo(() => {
        return (
            <div className="header-popover">
                <Divider orientation="left">颜色</Divider>
                <div className="tags">
                    <Tag color="#f50"></Tag>
                    <Tag color="#2db7f5"></Tag>
                    <Tag color="#87d068"></Tag>
                    <Tag color="#108ee9"></Tag>
                    <Tag color="#108567"></Tag>
                    <Tag color="#105679"></Tag>
                    <Tag color="#1057e9"></Tag>
                    <Tag color="#8e9"></Tag>
                    <Tag color="#156"></Tag>
                    <Tag color="#189"></Tag>
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
                        {titleDom}
                        {DesDOm}
                        {ChecklistDom}
                        {CommentDom}
                    </div>
                    <div className="content-right">
                        <Divider orientation="left">建议的标签</Divider>
                        <Popover placement="bottomLeft" content={AddCheckListDom} trigger="click">
                            <Button type="primary" block icon={<CheckSquareOutlined />}>
                                清单
                            </Button>
                        </Popover>
                        <Button className="mt10" type="primary" block icon={<FieldTimeOutlined />}>
                            日期
                        </Button>
                        <Button className="mt10" type="primary" block icon={<PaperClipOutlined />}>
                            附件
                        </Button>
                        <Button className="mt10" type="primary" block icon={<ColumnHeightOutlined />}>
                            拉伸
                        </Button>
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
