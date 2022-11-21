import React, { FC, MouseEvent } from 'react'
import './index.scss'

interface PropsType {
  onClick?: () => void
}
const Index: FC<PropsType> = ({ onClick }) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    onClick?.()
  }
  return <i className='board-more-btns' onClick={e => handleClick(e)}/>
}

export default Index
