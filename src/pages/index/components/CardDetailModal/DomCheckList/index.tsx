import {memo, FC} from 'react'
import {Checkbox, Row, Col} from 'antd'
import {OrderedListOutlined} from '@ant-design/icons'

export interface CheckList {
    items: string // 任务名
    isAccomplish: boolean // 是否完成
}
export interface CheckListProps {
    checkList?: CheckList[]
}

const Index: FC<CheckListProps> = ({checkList = []}) => {
    return (
        <>
            {checkList.length > 0 && <div className="content-left-item">
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
            }
        </>
    )
}
export default memo(Index)
