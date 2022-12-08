import './index.scss'
import {FC, memo, useMemo, useState} from 'react'
import {Popover, Button, DatePicker} from 'antd'
import {FieldTimeOutlined} from '@ant-design/icons'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {useShareMsg} from '@/store/useShareMsg'
import {apiCardUpdate} from '@/common/js/api'
const Index: FC = () => {
    const {shareMsg, setShareMsgAction} = useShareMsg()
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<string>('')
    const onChange = () => {
        apiCardUpdate({
            id: shareMsg.card.id,
            expireTime: date,
        }).then((res) => {
            setOpen(false)
            setShareMsgAction({
                card: {
                    ...shareMsg.card,
                    expireTime: date,
                },
                orgUserList: shareMsg.orgUserList,
                commentList: shareMsg.commentList,
                inventoryList: shareMsg.inventoryList,
            })
        })
    }
    const AddDateDom = useMemo(() => {
        return (
            <>
                <DatePicker
                    locale={locale}
                    showTime
                    onChange={(e, dateStr) => {
                        setDate(dateStr)
                    }}
                />
                <div></div>
                <Button className="mt10" size="small" type="primary" onClick={onChange}>
                    完成
                </Button>
            </>
        )
    }, [open, date])
    return (
        <>
            <Popover
                placement="bottomLeft"
                content={AddDateDom}
                trigger="click"
                open={open}
                onOpenChange={() => {
                    setOpen(true)
                }}>
                <Button className="mt10" type="primary" block icon={<FieldTimeOutlined />}>
                    日期
                </Button>
            </Popover>
        </>
    )
}

export default memo(Index)
