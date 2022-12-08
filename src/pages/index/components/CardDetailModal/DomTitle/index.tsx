import {memo, FC, useState, useMemo} from 'react'
import {Avatar, Input, Button, Popconfirm} from 'antd'
import {CreditCardOutlined} from '@ant-design/icons'
import {useShareMsg} from '@/store/useShareMsg'
import {CARD_DETAIL_TYPE} from '@/data/type'
import {apiCardUpdate, apiMemberDelete} from '@/common/js/api'

const Index: FC = () => {
    const {shareMsg, setShareMsgAction} = useShareMsg()
    const [editorTitle, setEditorTitle] = useState(false)
    const [title, setTitle] = useState(shareMsg.card.title)
    const changTitle = () => {
        setEditorTitle(false)
        const {card, commentList, inventoryList, orgUserList} = shareMsg
        apiCardUpdate({
            id: card.id,
            title: title,
        }).then((res) => {
            setShareMsgAction({
                card: {
                    ...card,
                    title: title,
                },
                commentList,
                inventoryList,
                orgUserList,
            })
        })
    }
    const confirm = (e: any) => {
        apiMemberDelete({id: e.memberId}).then((res) => {
            const {card, commentList, inventoryList, orgUserList} = shareMsg
            const newOrgUserList = orgUserList.filter((item: any) => {
                return item.memberId !== e.memberId
            })
            setShareMsgAction({
                card: {
                    ...card,
                },
                commentList,
                inventoryList,
                orgUserList: newOrgUserList,
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
                {shareMsg.card.expireTime?.length > 0 && (
                    <div className="desc pt10">到期时间：{shareMsg.card.expireTime}</div>
                )}
                {shareMsg.orgUserList?.length > 0 && (
                    <Avatar.Group className="mt20">
                        {shareMsg.orgUserList.map((item, index) => {
                            return (
                                <Popconfirm
                                    title="移除此用户？"
                                    placement="topLeft"
                                    okText="确认"
                                    cancelText="取消"
                                    onConfirm={() => {
                                        confirm(item)
                                    }}>
                                    <Avatar className="cursor-pointer" key={index} src={item.head} />
                                </Popconfirm>
                            )
                        })}
                    </Avatar.Group>
                )}
            </div>
        </div>
    )
}
export default memo(Index)
