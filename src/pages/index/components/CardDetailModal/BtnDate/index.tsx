import './index.scss'
import {FC, memo, useMemo, useState} from 'react'
import {Popover, Button, DatePicker} from 'antd'
import {FieldTimeOutlined} from '@ant-design/icons'
import {UserValue} from '@/data/type'
import locale from 'antd/es/date-picker/locale/zh_CN'
const {RangePicker} = DatePicker
interface PropsType {
    onChange?: (value: string[]) => void
}
const Index: FC<PropsType> = ({onChange}) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<string[]>([])
    const AddDateDom = useMemo(() => {
        return (
            <>
                <RangePicker
                    locale={locale}
                    onChange={(e, date) => {
                        setDate(date)
                    }}
                />
                <div></div>
                <Button
                    className="mt10"
                    size="small"
                    type="primary"
                    onClick={() => {
                        setOpen(false)
                        onChange && onChange(date)
                    }}>
                    完成
                </Button>
            </>
        )
    }, [open])
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
