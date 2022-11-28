import React, { useMemo, useState } from 'react'
import {Popover} from 'antd'
import './index.scss'

import BoardSelect from '@/Components/BoardSelect'

const Index = () => { // 移动卡片到对应的列表
  const [open, setOpen] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  }
  const handleDestination = () => { // 选择目的地
  }
  const handleList = () => { // 选择目的地
  }
  const handlePosition = () => { // 选择目的地
  }

  const REMOVE_CONT_DOM = useMemo(() => {
    return <div className='remove-card-to-other'>
      <h3>选择目的地</h3>
      <BoardSelect title='看板' options={[]} onChange={handleDestination}/>
      <footer>
        <BoardSelect title='列表' inline options={[]} onChange={handleList}/>
        <BoardSelect title='位置' inline options={[]} onChange={handlePosition}/>
      </footer>
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
