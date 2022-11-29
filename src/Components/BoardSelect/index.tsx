import React, { FC, useEffect, useState } from 'react'
import classnames from 'classnames'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import './index.scss'

interface PropsType {
  title: string
  options: SelectProps['options']
  value?: string | number
  inline?: boolean // 是否为块级元素
  disabled?: boolean
  onChange: (val: string) => void
}

const Index: FC<PropsType> = ({ title = '看板', options = [], value = '', inline, onChange }) => {
  const [currentValue, setCurrentValue] = useState<string>()
  const handleChange = (value: string) => {
    setCurrentValue(value)
    onChange(value)
  }
  useEffect(() => {
    setCurrentValue(value.toString())
  }, [value])
  return <div className={classnames('board-select', { inline })}>
    <p>{title}</p>
    <Select
      bordered={false}
      disabled={options.length === 0}
      showSearch
      defaultValue='大师傅'
      value={currentValue}
      style={{ width: '100%' }}
      placeholder="select Mode"
      onChange={handleChange}
      options={options}
    />
  </div>
}

export default Index
