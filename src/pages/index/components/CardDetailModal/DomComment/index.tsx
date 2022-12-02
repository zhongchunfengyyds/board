import {memo, FC, useState, useMemo} from 'react'
import {Mentions, Button, List} from 'antd'
import {CommentOutlined} from '@ant-design/icons'
import {apiCommentUpdate} from '@/common/js/api'

import {useShareMsg} from '@/store/useShareMsg'
export interface Comment {
    commentName: string // 评论人
    commentContent: string // 评论内容
    commentId: string // 评论人id
    cardId: string // 评论的卡片id
}
export interface CommentProps {
    commentList?: Comment[]
}
const Index: FC<CommentProps> = ({commentList = []}) => {
    const {shareMsg, setShareMsg} = useShareMsg()
    const [commentValue, setCommentValue] = useState('')
    const newComment = () => {
        // 调接口评论
        apiCommentUpdate({
            commentName: '张三',
            commentId: '1',
            cardId: shareMsg.card.id,
            commentContent: commentValue,
        }).then((res) => {
            console.log(shareMsg, '评论成功')
            setShareMsg({
                card: shareMsg.card,
                inventoryList: shareMsg.inventoryList,
                commentList: [res.data.result, ...shareMsg.commentList],
            })
            setCommentValue('')
        })
    }
    return (
        <>
            <div className="content-left-item">
                <CommentOutlined />
                <div className="right">
                    <div className="title">评论</div>
                    <div className="pt10"></div>
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
                    <div className="comment">
                        <List
                            size="small"
                            itemLayout="horizontal"
                            dataSource={shareMsg.commentList}
                            renderItem={(item:Comment) => (
                                <List.Item>
                                    <List.Item.Meta title={item.commentName} description={item.commentContent} />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Index
