import {memo, FC, useState} from 'react'
import {Avatar, Input, Button} from 'antd'
import {CreditCardOutlined} from '@ant-design/icons'
import {useShareMsg} from '@/store/useShareMsg'
import { CARD_DETAIL_TYPE } from '@/data/type'
import {apiCardUpdate} from '@/common/js/api'

const Index: FC = () => {
    const {shareMsg, setShareMsg} = useShareMsg()
    const [editorTitle, setEditorTitle] = useState(false)
    const [title, setTitle] = useState(shareMsg.card.title)
    const changTitle = () => {
        setEditorTitle(false)
        const {card, commentList, inventoryList} = shareMsg
        apiCardUpdate({
            id: card.id,
            title: title,
        }).then((res) => {
            setShareMsg({
                card: {
                    ...card,
                    title: title,
                },
                commentList,
                inventoryList,
            })
        })
    }
    return (
        <div className="content-left-item">
            <CreditCardOutlined />
            <div className="right">
                {!editorTitle ? (
                    <h3
                        className="cursor-pointer"
                        onClick={() => {
                            setEditorTitle(true)
                        }}>
                        {shareMsg.card.title}
                    </h3>
                ) : (
                    <>
                        <Input
                            placeholder="请输入标题"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                        <div className="mt10">
                            <Button size="small" type="primary" onClick={changTitle}>
                                确定
                            </Button>
                            <Button
                                size="small"
                                className="ml10"
                                onClick={() => {
                                    setEditorTitle(false)
                                }}>
                                取消
                            </Button>
                        </div>
                    </>
                )}
                {/* {date.length > 0 && (
                    <div className="desc pt10">
                        时间：
                        {date.map((item, index) => {
                            if (index === 0) {
                                return <span key={index}>{item}</span>
                            } else {
                                return <span key={index}> 至 {item}</span>
                            }
                        })}
                    </div>
                )} */}
                {/* {memberList.length > 0 && (
                    <Avatar.Group className="mt20">
                        {memberList.map((item, index) => {
                            return <Avatar key={index} src={item.head} />
                        })}
                    </Avatar.Group>
                )} */}
            </div>
        </div>
    )
}
export default memo(Index)
