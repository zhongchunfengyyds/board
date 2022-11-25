import React, {FC, useMemo, useEffect, useState, memo} from 'react'
import BoardMoreBtns from '@/components/BoardMoreBtns'
import {Button, Popover} from 'antd'
import './index.scss'
interface PropsType {}
const Index: FC<PropsType> = () => {
    const [open, setOpen] = useState<boolean>(false)
    const hide = () => {
        setOpen(false)
    }
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }
    const PopoverDom = useMemo(() => {
        return (
            <div className='list-more-operation'>
                <p>添加卡</p>
                <p>复制表</p>
                <p>排序依据</p>
                <p>移动列表中所有卡片</p>
                <p>归档列表中所有卡</p>
                <p>将此列表进行归档</p>
            </div>
        )
    }, [])
    return (
        <Popover
            content={PopoverDom}
            title="列表动态"
            trigger="click"
            placement="bottomLeft"
            open={open}
            onOpenChange={handleOpenChange}>
            <BoardMoreBtns />
        </Popover>
    )
}
export default memo(Index)
