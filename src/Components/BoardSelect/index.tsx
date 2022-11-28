import React, { FC, useState } from 'react'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import './index.scss'

interface PropsType {
  title: string
  options: SelectProps['options']
  value: string
  onChange: (val: string) => void
}

const Index: FC<PropsType> = ({ title = '看板', options = [], value = '', onChange }) => {
  const [currentValue, setCurrentValue] = useState<string>()
  const handleChange = (value: string) => {
    setCurrentValue(value)
    onChange(value)
  }
  return <div className='board-select'>
    <p>{title}</p>
    <Select
      showSearch
      defaultValue={currentValue}
      value={value}
      style={{ width: '100%' }}
      placeholder="select Mode"
      onChange={handleChange}
      options={options}
    />
  </div>
}

export default Index
