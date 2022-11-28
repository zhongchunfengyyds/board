import React, { useMemo, useState } from 'react'
import {Popover} from 'antd'
import './index.scss'

import BoardSelect from '@/Components/BoardSelect'

const Index = () => { // 移动卡片到对应的列表
  const [open, setOpen] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  }
  // const hide = () => {
  //   setOpen(false)
  // }
  const REMOVE_CONT_DOM = useMemo(() => {
    return <div className='remove-card-to-other'>
      <h3>选择目的地</h3>
      <BoardSelect />
    </div>
  }, [])
  return <Popover
      content={REMOVE_CONT_DOM}
      placement="topLeft"
      title="移动卡片"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
     <li>移动</li>
    </Popover>
}

export default Index
