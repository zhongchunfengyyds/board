import React, {useState} from 'react'
import {Button} from 'antd'
import './index.scss'
const index = () => {
    const [step, setStep] = useState(0)
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
                    <input type="text" placeholder="请输入列表标题" />
                    <div className="pc-board-add-second-btn">
                        <Button type="primary">添加列表</Button>
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
