import React, { FC } from 'react'
import './index.scss'

interface PropsType {
  onClick?: () => void
}
const Index: FC<PropsType> = ({ onClick }) => {
  return <i className='board-more-btns' onClick={onClick}/>
}

export default Index
