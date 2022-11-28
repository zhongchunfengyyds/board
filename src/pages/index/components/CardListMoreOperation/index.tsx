import React, {FC, useMemo, useState, memo, useRef, ChangeEvent} from 'react'
import BoardMoreBtns from '@/components/BoardMoreBtns'
import {Button, Popover} from 'antd'
import './index.scss'
interface PropsType {
  handleCopyList: (val: string) => void
  handleAddCard: () => void
}
const Index: FC<PropsType> = ({ handleCopyList, handleAddCard }) => {
    const [open, setOpen] = useState<boolean>(false)
    const hide = () => {
        setOpen(false)
    }
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }
    const [status, setStatus] = useState<string>('') // 默认显示列表
    const currentTitle = useRef<string>('')
    const handleCopyListNEW = () => {
        hide()
        handleCopyList(currentTitle.current)
        setStatus('')
    }
    const handleAddCardNEW = () => {
        hide()
        handleAddCard()
    }
    const COPY_CARD_DOM = useMemo(() => {
        return <div className='list-more-operation-name'>
          <h2>姓名</h2>
          <textarea
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              (currentTitle.current = e.target.value)
            }
            className="pc-card-cont-text"
            placeholder="为这张卡片输入标题…"
          />
          <div className="pc-card-cont-btns">
              <button onClick={handleCopyListNEW}>
                新建列表
              </button>
          </div>
        </div>
      }, [handleCopyListNEW, currentTitle.current])
    const PopoverDom = useMemo(() => {
        return (
            <div className='list-more-operation'>
                <p onClick={handleAddCardNEW}>添加卡</p>
                <p onClick={() => setStatus('COPY')}>复制表</p>
                <p>排序依据</p>
                <p>移动列表中所有卡片</p>
                <p>归档列表中所有卡</p>
                <p>将此列表进行归档</p>
            </div>
        )
    }, [handleAddCardNEW])
    const CURRRENT_DOM = useMemo(() => {
       if (status === 'COPY') return COPY_CARD_DOM
       else return PopoverDom
    }, [status])
    return (
        <Popover
            content={CURRRENT_DOM}
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
