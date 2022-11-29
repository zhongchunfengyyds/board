import {memo, FC, useState, useMemo} from 'react'
import {Mentions, Button, List} from 'antd'
import {CommentOutlined} from '@ant-design/icons'
import {apiCommentUpdate} from '@/common/js/api'

import {useCurrentCardItem} from '@/store/useCurrentCardItem'
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
    const {currentCardItem, setCurrentCardItem} = useCurrentCardItem()
    const [commentValue, setCommentValue] = useState('')
    const newComment = () => {
        // 调接口评论
        apiCommentUpdate({
            commentName: '张三',
            commentId: '1',
            cardId: currentCardItem.card.id,
            commentContent: commentValue,
        }).then((res) => {
            console.log(currentCardItem, '评论成功')
            setCurrentCardItem({
                card: currentCardItem.card,
                inventoryList: currentCardItem.inventoryList,
                commentList: [res.data.result, ...currentCardItem.commentList],
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
                            dataSource={currentCardItem.commentList}
                            renderItem={(item) => (
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
