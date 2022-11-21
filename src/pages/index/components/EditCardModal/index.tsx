import React, {FC, useRef, ChangeEvent, useEffect, useState} from 'react'

import './index.scss'
import BoardModal from '@/Components/BoardModal'

interface positionType {
    left: number
    top: number
}

interface PropsType {
    show: boolean
    value: string | undefined
    onClose: () => void
    handleConfirmEdit: (val: string) => void
    position?: positionType // 控制弹窗内容方向
}

const Index: FC<PropsType> = ({
    show,
    value,
    onClose,
    handleConfirmEdit,
    position = {left: 0, top: 0},
}) => {
    const {left, top} = position
    const [currentValue, setCurrentValue] = useState<string>('')
    const style = {
        left: `${left}px`,
        top: `${top}px`,
    }
    const handleSave = () => {
        if (!currentValue) return
        handleConfirmEdit(currentValue)
        setCurrentValue('')
        onClose?.()
    }
    useEffect(() => {
        setCurrentValue(value ?? '')
    }, [value])

    // 打开卡片详情
    const open = () => {}
    // 修改标签
    const changeTag = () => {}
    // 更改成员
    const changeMember = () => {}
    // 更改封面
    const changeCover = () => {}
    // 更改截止日期
    const changeDeadline = () => {}
    // 归档
    const archive = () => {}
    // 复制
    const copy = () => {}

    return (
        <BoardModal show={show} onClose={onClose}>
            <div className="pc-edit-card-modal" style={style}>
                <div>
                    <textarea
                        value={currentValue ?? ''}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setCurrentValue(e.target.value)
                        }
                    />
                    <div className="pc-card-cont-btns">
                        <button onClick={handleSave}>保存</button>
                    </div>
                </div>
                <ul>
                    <li onClick={open}>打开卡片</li>
                    <li onClick={changeTag}>修改标签</li>
                    <li onClick={changeMember}>更改成员</li>
                    <li onClick={changeCover}>更改封面</li>
                    <li onClick={copy}>复制</li>
                    <li onClick={changeDeadline}>编辑日期</li>
                    <li onClick={archive}>归档</li>
                </ul>
            </div>
        </BoardModal>
    )
}

export default Index
