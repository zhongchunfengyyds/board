import React, {FC, useMemo, ChangeEvent, useEffect, useState, memo} from 'react'
import {Mentions, Button, Checkbox, Col, Row, Avatar, List} from 'antd'
import {
    CreditCardOutlined,
    MenuUnfoldOutlined,
    OrderedListOutlined,
    CommentOutlined,
    CloseOutlined,
} from '@ant-design/icons'
const {Option} = Mentions
import BoardModal from '@/components/BoardModal'
import './index.scss'

interface PropsType {
    show: boolean
    id: string
    onClose?: () => void
}

const Index: FC<PropsType> = ({show, id, onClose}) => {
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
    }, [id])

    const DesDOm = useMemo(() => {
        return (
            <div className="content-left-item">
                <MenuUnfoldOutlined />
                <div className="right">
                    <div className="title">描述</div>
                    <div className="pt10"></div>
                    <div className="desc">
                        有多少爱可以重来，有多少人愿意等待
                    </div>
                </div>
            </div>
        )
    }, [id])

    const listDom = useMemo(() => {
        return (
            <div className="content-left-item">
                <OrderedListOutlined />
                <div className="right">
                    <div className="title">清单</div>
                    <div className="pt12"></div>
                    <Checkbox.Group style={{width: '100%'}}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <Checkbox value="A">A</Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox value="A">A</Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox value="A">A</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            </div>
        )
    }, [id])

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ]
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
                            style={{width: '100%'}}
                            placeholder="添加评论">
                            <Option value="afc163">afc163</Option>
                            <Option value="zombieJ">zombieJ</Option>
                            <Option value="yesmeck">yesmeck</Option>
                        </Mentions>
                        <div className="mt10"></div>
                        <Button size="small" type="primary">
                            评论
                        </Button>
                        <div className="mt20"></div>
                        <List
                            size="small"
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                                        }
                                        title={
                                            <a href="https://ant.design">
                                                {item.title}
                                            </a>
                                        }
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }, [id])
    return (
        <BoardModal show={show} onClose={onClose}>
            <div className="card-detail-modal">
                <header>
                    <Button
                        shape="circle"
                        type="text"
                        icon={<CloseOutlined />}
                    />
                    <Button type="text">拉伸</Button>
                </header>
                <div className="content">
                    <div className="content-left">
                        {titleDom}
                        {DesDOm}
                        {listDom}
                        {CommentDom}
                    </div>
                    <div className="content-right">123</div>
                </div>
            </div>
        </BoardModal>
    )
}

export default memo(Index) // 等同于你刚的效果
