import React, { FC, useEffect, useState, useRef, useMemo, ChangeEvent  } from 'react'
import './index.scss'

interface PropsType {
  show?: boolean
  onClose?: () => void
  handleCopyList: (val: string) => void
  handleAddCard: () => void
}

const Index: FC<PropsType> = ({ show = false, onClose, handleCopyList, handleAddCard }) => {
  const [innerVisible, setInnerVisible] = useState<boolean>(false)
  const [status, setStatus] = useState<string>('') // 默认显示列表
  const currentTitle = useRef<string>('')
  useEffect(() => {
    setInnerVisible(show)
  }, [show])
  const handleClose = (): void => {
    setInnerVisible(false)
    onClose?.()
  }
  const handleCopyListNEW = () => {
    handleClose()
    handleCopyList(currentTitle.current)
    setStatus('')
  }
  const handleAddCardNEW = () => {
    handleAddCard()
  }
  const Lits_DOM = useMemo(() => {
    return <ul className='pc-copy-card-list'>
      <li className='item title'>列表动态</li>
      <li className='item' onClick={handleAddCardNEW}>添加卡</li>
      <li className='item' onClick={() => setStatus('COPY')}>复制列表</li>
      <li className='item'>移动列表</li>
      <li className='item'>关注</li>
      <li className='item'>排序依据</li>
      <li className='item'>将卡片被添加到列表中</li>
      <li className='item'>每天，按下列方式对列表排序</li>
      <li className='item'>每个星期一， 按下列方式对列表排序</li>
      <li className='item'>创建自定义规则</li>
      <li className='item'>移除列表中的所有卡片</li>
      <li className='item'>归档此列表中的所有卡片</li>
      <li className='item'>将此列表进行归档</li>
    </ul>
  }, [handleAddCardNEW])

  const COPY_CARD_DOM = useMemo(() => {
    return <div className='pc-copy-card-name'>
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
  return <>
      {
        innerVisible && <div className='pc-copy-card'>
          { status === '' && Lits_DOM }
          { status === 'COPY' && COPY_CARD_DOM }
        </div>
      }
      {
        innerVisible && <i onClick={() => {
          handleClose()
          setStatus('')
        }} className='pc-copy-card-mask'/>
      }
    </>
}

export default Index
