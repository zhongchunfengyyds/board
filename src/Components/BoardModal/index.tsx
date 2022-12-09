import React, { FC, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

import './index.scss'

interface PropsType {
  
  show: boolean
  children?: React.ReactElement | React.ReactElement[]
  onClose?: () => void
}

const Index: FC<PropsType> = ({ show = false, onClose, children }) => {
  const [innerVisible, setInnerVisible] = useState<boolean>(false)
  useEffect(() => {
    setInnerVisible(show)
  }, [show])
  const handleClose = (): void => {
    setInnerVisible(false)
    onClose?.()
  }
  return createPortal(
    <>
      {
        innerVisible && <div className='pc-board-modal'>
          <div className='pc-board-modal-mask' onClick={handleClose} aria-hidden="true" />
          <div className='pc-board-modal-cont'>
            {children}
          </div>
        </div>
      }
      
    </>, document.body)
}

export default Index
