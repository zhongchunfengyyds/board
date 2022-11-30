import {memo, FC} from 'react'
import {Checkbox, Row, Col} from 'antd'
import {OrderedListOutlined} from '@ant-design/icons'
import {useShareMsg} from '@/store/useShareMsg'
import {apiCheckboxUpdate} from '@/common/js/api'

export interface CheckList {
    cardId: string
    items: string // 任务名
    isAccomplish: number // 是否完成
    id: string
}

const Index: FC = () => {
    const {shareMsg, setShareMsg} = useShareMsg()
    const {card, commentList, inventoryList} = shareMsg
    const onChange = (e: any, index: number) => {
        const newInventoryList = JSON.parse(JSON.stringify(inventoryList))
        const newCheckList: CheckList = newInventoryList[index]
        newCheckList.isAccomplish = e.target.checked ? 1 : 0
        apiCheckboxUpdate({
            cardId: newCheckList.cardId,
            isAccomplish: newCheckList.isAccomplish,
            id: newCheckList.id,
            items: newCheckList.items,
        }).then((res) => {
            setShareMsg({
                card,
                commentList,
                inventoryList: newInventoryList,
            })
        })
    }
    return (
        <>
            {inventoryList.length > 0 && (
                <div className="content-left-item">
                    <OrderedListOutlined />
                    <div className="right">
                        <div className="title">清单</div>
                        <div className="pt12"></div>
                        <Row gutter={[0, 10]}>
                            {inventoryList.map((item, index) => {
                                return (
                                    <Col span={24} key={index}>
                                        <Checkbox
                                            checked={item.isAccomplish === 1}
                                            onChange={(e) => {
                                                onChange(e, index)
                                            }}>
                                            {item.items}
                                        </Checkbox>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </div>
            )}
        </>
    )
}
export default memo(Index)
