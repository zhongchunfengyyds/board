import './index.scss'
import {FC, memo, useMemo, useState} from 'react'
import {Popover, Button, Divider, Tag} from 'antd'
import {ColumnHeightOutlined} from '@ant-design/icons'
import {useShareMsg} from '@/store/useShareMsg'
import {apiCardUpdate} from '@/common/js/api'

const Index: FC = () => {
    const {shareMsg, setShareMsgAction} = useShareMsg()
    const [open, setOpen] = useState(false)
    const onChange = (color: string) => {
        const {card, commentList, inventoryList} = shareMsg
        apiCardUpdate({
            id: card.id,
            color: color,
        }).then((res) => {
            setShareMsgAction({
                card: {
                    ...card,
                    color: color,
                },
                commentList,
                inventoryList,
            })
            setOpen(false)
        })
    }
    const colorList = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#f50', '#2db7f5', '#87d068', '#108ee9']
    const content = useMemo(() => {
        return (
            <>
                <div className="header-popover">
                    <Divider orientation="left">颜色</Divider>
                    <div className="tags">
                        {colorList.map((item, index) => {
                            return (
                                <Tag
                                    className="cursor-pointer"
                                    color={item}
                                    key={index}
                                    onClick={() => {
                                        onChange?.(item)
                                    }}></Tag>
                            )
                        })}
                    </div>
                    <div className="mt20"></div>
                    <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                            onChange?.('')
                        }}>
                        移除颜色
                    </Button>
                </div>
            </>
        )
    }, [open])
    return (
        <>
            <Popover
                placement="bottomLeft"
                content={content}
                trigger="click"
                open={open}
                onOpenChange={() => {
                    setOpen(true)
                }}>
                <Button className="mt10" type="primary" block icon={<ColumnHeightOutlined />}>
                    拉伸
                </Button>
            </Popover>
        </>
    )
}

export default memo(Index)
