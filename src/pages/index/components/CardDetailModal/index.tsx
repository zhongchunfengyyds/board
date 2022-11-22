import React, {FC, useMemo, ChangeEvent, useEffect, useState, memo} from 'react'
import {Mentions} from 'antd'
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
                <img src="" alt="" />
                <div className="right">
                    <h3>标题</h3>
                    <div className="desc">介绍</div>
                    <div className="tag">
                        <div className="tag-title">标签</div>
                        <div className="tag-content">
                            <div className="tag-content-item success">
                                <div className="tag-content-item-point"></div>
                                成功
                            </div>
                            <div className="tag-content-item warning">
                                <div className="tag-content-item-point"></div>
                                警告
                            </div>
                            <div className="tag-content-item error">
                                <div className="tag-content-item-point"></div>
                                错误
                            </div>
                            <div className="tag-content-item primary">
                                <div className="tag-content-item-point"></div>
                                主要
                            </div>
                            <div className="tag-content-item stop">
                                <div className="tag-content-item-point"></div>
                                停止
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }, [id])

    const DesDOm = useMemo(() => {
        return (
            <div className="content-left-item">
                <img src="" alt="" />
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
                <img src="" alt="" />
                <div className="right">
                    <div className="title">清单</div>
                    <div className="pt10"></div>
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            name="清单"
                            id="checkbox1"
                            className="checkbox-input cursor-pointer"
                        />
                        <label
                            htmlFor="checkbox1"
                            className="ml5 checkbox-label cursor-pointer">
                            哈哈哈
                        </label>
                    </div>
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            name="清单"
                            className="checkbox-input cursor-pointer"
                        />
                        <label
                            className="ml5 checkbox-label  cursor-pointer"
                            cursor-pointer>
                            哈哈哈
                        </label>
                    </div>
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            name="清单"
                            className="checkbox-input cursor-pointer"
                        />
                        <label
                            className="ml5 checkbox-label  cursor-pointer"
                            cursor-pointer>
                            哈哈哈
                        </label>
                    </div>
                </div>
            </div>
        )
    }, [id])

    const CommentDom = useMemo(() => {
        return (
            <div className="content-left-item">
                <img src="" alt="" />
                <div className="right">
                    <div className="title">活动</div>
                    <div className="pt10"></div>
                    <div className="comment">
                        <Mentions autoSize style={{width: '100%'}}>
                            <Option value="afc163">afc163</Option>
                            <Option value="zombieJ">zombieJ</Option>
                            <Option value="yesmeck">yesmeck</Option>
                        </Mentions>
                        <div className="comment-item"> </div>
                    </div>
                </div>
            </div>
        )
    }, [id])
    return (
        <BoardModal show={show} onClose={onClose}>
            <div className="card-detail-modal">
                <header>title</header>
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
