import React, {useState} from 'react'
import {Button} from 'antd'
import {useCardListAction} from '@/store/useCardList'
import './index.scss'

import {apiListUpdate} from '@/common/js/api'
const index = () => {
    const [step, setStep] = useState(0)
    const [title, setTitle] = useState('')
    const {AddCardListAction} = useCardListAction()

    const handleAdd = () => {
        if (!title) return
        apiListUpdate({listName: title}).then((res) => {
            setStep(0)
            AddCardListAction({ title, cardItem: [] })
        })
    }
    return (
        <div className="pc-card-cont pc-board-add" style={{height: step == 0 ? '40px' : '95px'}}>
            {step === 0 ? (
                <div
                    className="pc-board-add-first"
                    onClick={() => {
                        setStep(1)
                    }}>
                    添加另一个列表
                </div>
            ) : (
                <div className="pc-board-add-second">
                    <input
                        type="text"
                        placeholder="请输入列表标题"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <div className="pc-board-add-second-btn">
                        <Button type="primary" onClick={handleAdd}>
                            添加列表
                        </Button>
                        <Button
                            className="ml10"
                            onClick={() => {
                                setStep(0)
                            }}>
                            取消
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default index
