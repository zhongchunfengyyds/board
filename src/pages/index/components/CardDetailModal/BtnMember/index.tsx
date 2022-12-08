import './index.scss'
import {FC, memo, useMemo, useState} from 'react'
import {Popover, Button} from 'antd'
import {CheckSquareOutlined} from '@ant-design/icons'
import {UserValue} from '@/data/type'
import UserSelect from '@/components/UserSelect'
import {useShareMsg} from '@/store/useShareMsg'
import {apiSaveMember} from '@/common/js/api'
import {useEventBus} from '@/hook/useEventBus'
const Index: FC = () => {
    const {shareMsg, setShareMsgAction} = useShareMsg()
    const {emit} = useEventBus()
    const [open, setOpen] = useState(false)
    const initUserList = shareMsg.orgUserList?.map((item) => {
        return {
            value: item.id,
            label: item.fullname,
            ...item,
        }
    })
    console.log(initUserList)
    const [selectedUsers, setSelectedUsers] = useState<UserValue[]>(initUserList || [])
    const onChange = () => {
        const userIds = shareMsg.orgUserList?.map((item) => item.id)
        const newIds = selectedUsers.filter((item) => !userIds.includes(item.value)).map((item) => item.value)
        Promise.all(
            newIds.map((item) => {
                return apiSaveMember({
                    tabulatedId: shareMsg.card.tabulatedId,
                    userId: item,
                    cardId: shareMsg.card.id,
                })
            }),
        ).then(() => {
            setOpen(false)
            emit('openCardDetail', shareMsg.card.id)
        })
    }
    const content = useMemo(() => {
        return (
            <div className="member">
                {open && (
                    <UserSelect
                        onChange={(e) => {
                            setSelectedUsers(e)
                        }}
                    />
                )}
                <Button className="mt10" type="primary" size="small" onClick={onChange}>
                    完成
                </Button>
            </div>
        )
    }, [selectedUsers, open])
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
