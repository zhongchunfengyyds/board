import './index.scss'
import {FC, memo, useMemo, useState} from 'react'
import {Popover, Button} from 'antd'
import {CheckSquareOutlined} from '@ant-design/icons'
import {UserValue} from '@/data/type'
import UserSelect from '@/components/UserSelect'
import {UserSelectProps} from '@/components/UserSelect'
const Index: FC<UserSelectProps> = ({value, onChange}) => {
    const [open, setOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<UserValue[]>(value || [])
    const content = useMemo(() => {
        return (
            <div className="member">
                <UserSelect
                    value={selectedUsers}
                    onChange={(e) => {
                        setSelectedUsers(e)
                    }}
                />
                <Button
                    className="mt10"
                    type="primary"
                    size="small"
                    onClick={() => {
                        onChange && onChange(selectedUsers)
                        setOpen(false)
                    }}>
                    完成
                </Button>
            </div>
        )
    }, [selectedUsers])
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
                <Button type="primary" block icon={<CheckSquareOutlined />}>
                    成员
                </Button>
            </Popover>
        </>
    )
}

export default memo(Index)
