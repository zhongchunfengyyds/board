import {memo, FC} from 'react'
import {Avatar} from 'antd'
import {CreditCardOutlined} from '@ant-design/icons'
import {useCurrentCardItem} from '@/store/useCurrentCardItem'

const Index: FC = () => {
    const {currentCardItem, setCurrentCardItem} = useCurrentCardItem()
    return (
        <div className="content-left-item">
            <CreditCardOutlined />
            <div className="right">
                <h3>{currentCardItem.card.title}</h3>
                {/* <div className="desc pt10">{currentCardItem.dess}</div> */}
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
